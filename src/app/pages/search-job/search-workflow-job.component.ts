import {Component, OnDestroy, OnInit} from "@angular/core";
import {BrowseJob} from "../../../dataSpaceUI/app/domain/job";
import {Subscriber} from "rxjs";
import {InputService} from "../../services/input.service";
import {AuthenticationService} from "../../../dataSpaceUI/app/services/authentication.service";
import {UserService} from "../../../dataSpaceUI/app/services/user.service";
import {UserInfo} from "../../../dataSpaceUI/app/domain/userInfo";

declare var require: any;
const seedRandom = require('seedrandom');

@Component({
  selector: 'pages-browse-jobs',
  templateUrl: 'search-workflow-job.component.html'
})

export class SearchWorkflowJobComponent implements OnInit, OnDestroy {

  subscriptions = [];
  jobs: BrowseJob[] = [];
  filteredJobs: BrowseJob[] = [];
  status: string = '';
  workflowType: string = '';

  // Paging
  currentPage: number = 0;
  totalPages: number = null;
  total: number = null;
  pages: number[] = [];
  pageSize: number = 10;
  from: number = 0;
  to: number = 10;

  userInfo: UserInfo = null;

  showEasterGifValue: boolean = false;

  constructor(private inputService: InputService, private authentication: AuthenticationService, private userService: UserService) {
  }

  ngOnInit() {
    this.subscriptions.push(
      this.inputService.getJobs().subscribe(
        res => {
          this.jobs = this.filteredJobs = res;
          this.pagingInit();
        },
        error => {console.log(error)},
        () => {
          for (const job of this.jobs) {
            job.callerAttributesObj = JSON.parse(job.callerAttributes);
          }
          this.userService.getUserInfo().subscribe(
            res => {
              this.userInfo = res;
              this.userService.roleToSessionStorage(res);
              this.showEasterGif();
              // console.log(this.userInfo);
            }, error => {
              console.log(error);
              this.userService.clearUserInfo();
            }
          )
        }
      )
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      if (subscription instanceof Subscriber) {
        subscription.unsubscribe();
      }
    });
  }

  hasRole(role: string) {
    return this.userInfo.roles.indexOf(role) > -1;
  }

  showEasterGif() {
    this.showEasterGifValue = false;

    if (this.userInfo?.roles?.indexOf('EASTER') > -1) {
      // console.log(seedRandom(Date.now()));
      // seedRandom(new Date().getTime() / 1000);
      if(Math.random() < 0.333) {
        this.showEasterGifValue = true;
        setTimeout(() => {
          this.showEasterGifValue = false;
        }, 4000);
      }
    }
  }

  getWorkflowType(obj: object) {
    for (const [key, value] of Object.entries(obj)) {
      for (const [subKey, subValue] of Object.entries(value)) {
        if (subKey === 'workflowType') {
          return subValue;
        }
      }
    }
  }

  getNumberOfFilters(obj: object) {
    let sum = 0;
    obj[2]['jobArguments'].forEach( arg => {
      sum += arg.value.length;
    });
    return sum;
  }

  getFilters(obj: object) {
    return obj[2]['jobArguments'];
  }

  /** Paging **/
  pagingInit() {
    this.pages = [...Array(Math.ceil(this.filteredJobs.length/this.pageSize)).keys()];
    this.total = this.filteredJobs.length;
    this.totalPages = Math.ceil(this.filteredJobs.length/this.pageSize);
    this.from = this.total === 0 ? -1 : 0;
    this.to = this.pageSize > this.total ? this.total : this.pageSize;
    this.currentPage = 0;
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.from = this.pageSize * this.currentPage;
    this.to = this.pageSize * (this.currentPage+1) > this.total ? this.total : this.pageSize * (this.currentPage+1);
  }

  previousPage() {
    if (this.currentPage > 0)
      this.goToPage(this.currentPage - 1);
  }

  nextPage() {
    if (this.currentPage < this.totalPages)
      this.goToPage(this.currentPage + 1);
  }


  /** Filtering **/
  filter() {
    if ((this.status === '' || this.status === null) && (this.workflowType === '' || this.workflowType === null)) {
      this.filteredJobs = this.jobs;
      this.pagingInit();
      return;
    }
    if (this.status === '' || this.status === null) {
      this.filteredJobs = this.jobs.filter(job => {
        let attributes = JSON.parse(job.callerAttributes);
        return attributes[1]['workflowType'] === this.workflowType;
      });
      this.pagingInit();
      return
    }
    // fixme Check for failed, killed, canceled and error status when failed is selected!!
    if (this.workflowType === '' || this.workflowType === null) {
      this.filteredJobs = this.jobs.filter(job => job.mergedStatus === this.status);
      this.pagingInit();
      return
    }
    this.filteredJobs = this.jobs.filter(job => {
      let attributes = JSON.parse(job.callerAttributes);
      return (attributes[1]['workflowType'] === this.workflowType) && job.mergedStatus === this.status;
    });
    this.pagingInit();
  }

  downloadFile(id: string) {
    this.inputService.downloadOutput(id);
  }

}
