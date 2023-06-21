import {Component, OnInit} from "@angular/core";
import {ResourcePayloadService} from "../../../services/resource-payload.service";
import {CatalogueService} from "../../../services/catalogue.service";
import {BrowseJob} from "../../../domain/job";
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'home-dashboard',
  templateUrl: 'home-dashboard.component.html',
  providers: [ResourcePayloadService, CatalogueService]
})

export class HomeDashboardComponent implements OnInit {
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
    if (this.authService.userRoles.includes('OPERATOR-WORKFLOW_PROCESSOR'))
      this.catalogueService.getJobs().subscribe(res=> this.jobs = res);
  }
}
