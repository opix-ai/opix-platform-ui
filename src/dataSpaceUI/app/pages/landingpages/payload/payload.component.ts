import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ResourcePayloadService} from "../../../services/resource-payload.service";
import {LandingPageService} from "../../../../catalogue-ui/services/landing-page.service";
import {environment} from "../../../../environments/environment";
import {AuthenticationService} from "../../../services/authentication.service";

import UIkit from "uikit";

@Component({
  selector: 'app-payload-landing',
  templateUrl: 'payload.component.html',
  providers: [ResourcePayloadService, LandingPageService, AuthenticationService]
})

export class PayloadComponent implements OnInit{

  projectName = environment.projectName

  payload = null;
  resourceType: string = null;
  relatedDatasets: {id: string, name: string}[] = [];

  constructor(private route: ActivatedRoute, private resourcePayloadService: ResourcePayloadService,
              private landingPageService: LandingPageService, protected authService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.resourceType = params['resourceType'];
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
    });
  }

  deleteItem() {
    this.resourcePayloadService.deleteItem(this.payload['id'], this.resourceType).subscribe(
      res => {
        // UIkit.modal('#delete-modal').hide();
        this.router.navigate([`/search/${this.resourceType}`]);
      },
      error => {
        // UIkit.modal('#delete-modal').hide();
        console.error(error);
      }
    );
  }

  hasRole() {
    return this.authService.userRoles.includes('OPERATOR_DEVELOPER');
  }
}
