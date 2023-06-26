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

  constructor(private inputService: InputService) {
  }

  ngOnInit() {
    this.subscriptions.push(
      this.inputService.getJobs().subscribe(
        res => {this.jobs = this.filteredJobs = res},
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
    for (const [key, value] of Object.entries(obj)) {
      for (const [subKey, subValue] of Object.entries(value)) {
        if (subKey === 'jobArguments') {
          let subValueObj = subValue as [object];
          return subValueObj.length;
        }
      }
    }
    return 0;
  }

  getFiltersAsAMap(obj: object) {
    let myMap = new Map<string, string[]>();

    for (const [key, value] of Object.entries(obj)) {
      // console.log(`key: ${key} value: ${value}`);
      for (const [subKey, subValue] of Object.entries(value)) {
        if (subKey === 'jobArguments') {
          for (const item of subValue as [object]) {
            // console.log('item[\'name\']: ', item['name']);
            // console.log('item[\'value\']: ', item['value']);
            if (myMap.has(item['name'])) {
              myMap.get(item['name']).push(item['value']);
            } else {
              myMap.set(item['name'],[item['value']]);
            }
          }

          // console.log(myMap);
          return myMap;
        }
      }
    }
    return myMap;
  }

  getJobArguments(obj: object) {
    for (const [key, value] of Object.entries(obj)) {
      // console.log(`key: ${key} value: ${value}`);
      for (const [subKey, subValue] of Object.entries(value)) {
        if (subKey === 'jobArguments') {
          // console.log(subValue);
          return subValue as [object];
        }
      }
    }
    return []
  }

  getValueFromObject(obj: object, keyName: string) {
    for (const [key, value] of Object.entries(obj)) {
      for (const [subKey, subValue] of Object.entries(value)) {
        if (subKey === keyName) {
          return subValue;
        }
      }
    }
    return null;
  }

  filter() {
    if ((this.status === '' || this.status === null) && (this.workflowType === '' || this.workflowType === null)) {
      this.filteredJobs = this.jobs;
      return;
    }
    if (this.status === '' || this.status === null) {
      this.filteredJobs = this.jobs.filter(job => {
        let attributes = JSON.parse(job.callerAttributes);
        return attributes[1]['workflowType'] === this.workflowType;
      });
      return
    }
    if (this.workflowType === '' || this.workflowType === null) {
      this.filteredJobs = this.jobs.filter(job => job.mergedStatus === this.status);
      return
    }
    this.filteredJobs = this.jobs.filter(job => {
      let attributes = JSON.parse(job.callerAttributes);
      return (attributes[1]['workflowType'] === this.workflowType) && job.mergedStatus === this.status;
    });
  }

}
