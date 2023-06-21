import {Component, OnInit} from "@angular/core";
import {PayloadComponent} from "../../../dataSpaceUI/app/pages/landingpages/payload/payload.component";
import {AuthenticationService} from "../../../dataSpaceUI/app/services/authentication.service";
import {ResourcePayloadService} from "../../../dataSpaceUI/app/services/resource-payload.service";
import {LandingPageService} from "../../../dataSpaceUI/catalogue-ui/services/landing-page.service";

@Component({
  selector: 'app-payload-extended-landing',
  templateUrl: 'payload-extend.component.html',
  providers: [ResourcePayloadService, LandingPageService, AuthenticationService]
})

export class PayloadExtendComponent extends PayloadComponent implements OnInit{

  hasRole(role: string) {
    const userRoles: string[] = this.authService.userRoles;
    return userRoles.includes(role);

  }
}
