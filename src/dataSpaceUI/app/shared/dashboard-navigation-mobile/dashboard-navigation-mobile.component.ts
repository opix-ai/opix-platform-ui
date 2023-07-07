import {Component, Input, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {UserService} from "../../services/user.service";
import {UserInfo} from "../../domain/userInfo";
import {Subscriber} from "rxjs";

@Component({
  selector: 'app-dashboard-navigation-mobile',
  templateUrl: 'dashboard-navigation-mobile.component.html',
  styleUrls: ['./dashboard-navigation-mobile.component.css']
})

export class DashboardNavigationMobileComponent implements OnInit, OnDestroy {

  subscriptions = [];
  toggle: number[] = [];
  userInfo: UserInfo;
  // roles = ['OPERATOR_DATA-PROCESSOR','OPERATOR_DATASET-INGESTOR','OPERATOR_DATASET-OWNER','OPERATOR_DEVELOPER']

  constructor(private userService: UserService) {
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
          this.userService.clearUserInfo()
        }
      )
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      if (subscription instanceof Subscriber) {
        subscription.unsubscribe();
      }
    });
  }

  hasRole(role: string) {
    // console.log(role);
    // console.log(this.userInfo.roles.indexOf(role) > -1);
    return this.userInfo.roles.indexOf(role) > -1;
    // return this.roles.indexOf(role) > -1;
  }
}
