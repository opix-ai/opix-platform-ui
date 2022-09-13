import {Component, OnDestroy, OnInit} from "@angular/core";
import {CatalogueService} from "../../services/catalogue.service";
import {BrowseJob} from "../../domain/job";
import {Subscriber} from "rxjs";


@Component({
  selector: 'pages-browse-jobs',
  templateUrl: 'browse-jobs.component.html'
})

export class BrowseJobsComponent implements OnInit, OnDestroy {

  subscriptions = [];
  jobs: BrowseJob[] = [];

  constructor(private catalogueService: CatalogueService) {
  }

  ngOnInit() {
    this.subscriptions.push(
      this.catalogueService.getJobs().subscribe(
        res => {this.jobs = res},
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

}
