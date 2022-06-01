import {Component, OnInit} from "@angular/core";
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'app-top-menu-landing',
  templateUrl: 'top-menu-landing.component.html',
  styleUrls: ['../top-menu.component.css'],
})

export class TopMenuLandingComponent implements OnInit {

  showLogin = true;

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
