import {Component, OnDestroy, OnInit} from "@angular/core";
import {BrowseJob} from "../../../dataSpaceUI/app/domain/job";
import {Subscriber} from "rxjs";
import {InputService} from "../../services/input.service";


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

  constructor(private inputService: InputService) {
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
    console.log(obj[2]['jobArguments']);
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

}
