import {Component, OnInit} from "@angular/core";
import {AuthenticationService} from "../../../services/authentication.service";
import {environment} from "../../../../../environments/environment";
import {UserService} from "../../../services/user.service";
import {UserInfo} from "../../../domain/userInfo";

@Component({
  selector: 'app-top-menu-landing',
  templateUrl: 'top-menu-landing.component.html',
  styleUrls: ['../top-menu.component.css'],
})

export class TopMenuLandingComponent implements OnInit {

  subscriptions = [];
  userInfo: UserInfo = null;
  projectName = environment.projectName;

  logoURL = environment.logoURL ? environment.logoURL : 'https://www.opix.ai/images/Logos/opix%20logo%202.svg';

  constructor(private authentication: AuthenticationService, private userService: UserService) {
  }

  ngOnInit() {
    this.subscriptions.push(
      this.userService.getUserInfo().subscribe(
        res => {
          this.userInfo = res;
          this.userService.roleToSessionStorage(res);
          // console.log(this.userInfo);
        }, error => {
          console.log(error);
          this.userService.clearUserInfo();
        }
      )
    );
  }

  parseUsername() {
    let firstLetters = "";
    let matches = this.userInfo.fullname?.match(/\b(\w)/g);
    if(matches)
      firstLetters += matches.join('');
    return firstLetters;
  }

  hasRoles() {
    return this.authentication.userRoles.length > 0
  }

  logInButton() {
    this.authentication.login();
  }

  logout() {
    this.authentication.logout();
  }

  isLoggedIn() {
    return this.authentication.authenticated;
  }
}
