import {AfterViewInit, Component, OnInit, ViewChild} from "@angular/core";
import {ResourcePayloadService} from "../../../dataSpaceUI/app/services/resource-payload.service";
import {CatalogueService} from "../../../dataSpaceUI/app/services/catalogue.service";
import {BrowseJob} from "../../../dataSpaceUI/app/domain/job";
import {AuthenticationService} from "../../../dataSpaceUI/app/services/authentication.service";

declare var UIkit;

@Component({
  selector: 'home-dashboard',
  templateUrl: 'home-dashboard-opix.component.html',
  providers: [ResourcePayloadService, CatalogueService]
})

export class HomeDashboardOpixComponent implements OnInit, AfterViewInit {

  @ViewChild('bla') mydrop;

  toolsCount = 0;
  datasetCount = 0;
  jobs: BrowseJob[] = []

  constructor(private resourceService: ResourcePayloadService, private catalogueService: CatalogueService,
              private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.resourceService.getItemsWithQueryParams('dataset_type').subscribe(res=> {
      this.datasetCount = res.total;
    });
    this.resourceService.getItemsWithQueryParams('tool').subscribe(res=> {
      this.toolsCount = res.total;
    });
    if (this.authService.userRoles.includes('OPERATOR-WORKFLOW_PROCESSOR')) {
      this.catalogueService.getJobs().subscribe(
        res=> {
          this.jobs = res;
          for (const job of this.jobs) {
            job.callerAttributesObj = JSON.parse(job.callerAttributes);
            this.getFiltersAsAMap(job.callerAttributesObj);
          }
        }
      );
    }
  }

  ngAfterViewInit() {
    UIkit.dropdown(this.mydrop.nativeElement);
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

  setReturnUrl() {
    sessionStorage.setItem('returnUrl', location.pathname);
  }

}
