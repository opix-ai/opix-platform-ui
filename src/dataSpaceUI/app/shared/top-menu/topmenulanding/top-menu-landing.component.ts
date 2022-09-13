import {Component, OnInit} from "@angular/core";
import {AuthenticationService} from "../../../services/authentication.service";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-top-menu-landing',
  templateUrl: 'top-menu-landing.component.html',
  styleUrls: ['../top-menu.component.css'],
})

export class TopMenuLandingComponent implements OnInit {

  showLogin = true;
  projectName = environment.projectName;

  constructor(private authentication: AuthenticationService) {
  }

  ngOnInit() {

  }

  logInButton() {
    this.authentication.login();
  }

  logout() {
    // this.authentication.logout();
  }
}
