import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {ResourcePayloadService} from "../../../services/resource-payload.service";
import {LandingPageService} from "../../../../catalogue-ui/services/landing-page.service";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-payload-landing',
  templateUrl: 'payload.component.html',
  providers: [ResourcePayloadService, LandingPageService]
})

export class PayloadComponent implements OnInit{

  projectName = environment.projectName

  payload = null;
  relatedDatasets: {id: string, name: string}[] = [];

  constructor(private route: ActivatedRoute, private resourcePayloadService: ResourcePayloadService,
              private landingPageService: LandingPageService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params);
      this.resourcePayloadService.getItem(params['resourceType'], params['identifierValue']).subscribe(
        next => {this.payload = next;},
        error => {console.log(error);},
        () => {
          this.relatedDatasets = [];
          for (let i = 0; i < this.payload?.relatedIdentifiers?.length; i++) {
            if (this.payload.relatedIdentifiers[i].resourceTypeGeneral === 'DATASET') {
              this.landingPageService.getDataset(this.payload.relatedIdentifiers[i].value).subscribe(
                next => {
                  this.relatedDatasets.push({id: this.payload.relatedIdentifiers[i].value, name: next['name']});
                }
              );
            }
          }
        }
      );
    })
  }
}
