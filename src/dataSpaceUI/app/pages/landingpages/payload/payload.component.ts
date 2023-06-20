import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {ResourcePayloadService} from "../../../services/resource-payload.service";
import {LandingPageService} from "../../../../catalogue-ui/services/landing-page.service";
import {environment} from "../../../../environments/environment";
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'app-payload-landing',
  templateUrl: 'payload.component.html',
  providers: [ResourcePayloadService, LandingPageService, AuthenticationService]
})

export class PayloadComponent implements OnInit{

  projectName = environment.projectName

  payload = null;
  relatedDatasets: {id: string, name: string}[] = [];

  constructor(private route: ActivatedRoute, private resourcePayloadService: ResourcePayloadService,
              private landingPageService: LandingPageService, private authService: AuthenticationService) {
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

  hasRole(role: string) {
    const userRoles: string[] = this.authService.userRoles;
    return userRoles.includes(role);

  }
}
