import {Component} from "@angular/core";
import {LandingPageService} from "../../../catalogue-ui/services/landing-page.service";
import {LandingPageComponent} from "../../../catalogue-ui/pages/landingpages/dataset/landing-page.component";

declare var UIkit: any;

@Component({
  selector: 'pages-dataset',
  templateUrl: 'dataset-landing-page.component.html',
  providers: [LandingPageService]
})

export class DatasetLandingPageComponent extends LandingPageComponent {

  gotoRequestData(instanceId, datasetId) {
    this.navigationService.setDataRequestIds(instanceId, datasetId);
    this.router.navigate([`/request-data`]);
    UIkit.modal('#modal-dataset-instances').hide();
  }

}
