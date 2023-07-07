import {Component, Input, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {UserService} from "../../services/user.service";
import {UserInfo} from "../../domain/userInfo";
import {Subscriber} from "rxjs";

@Component({
  selector: 'app-side-menu-dashboard',
  templateUrl: 'side-menu-dashboard.component.html',
  styleUrls: ['./side-menu-dashboard.component.css']
})

export class SideMenuDashboardComponent implements OnInit, OnDestroy {

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

  toggleSidebar() {
    const el: HTMLElement = document.getElementById('sidebar_toggle');
    if(!el.classList.contains('closed')) {
      el.classList.add('closed');
      const el1: HTMLElement = document.getElementById('sidebar_main_content');
      el1.classList.remove('sidebar_main_active');
      el1.classList.add('sidebar_main_inactive');
    } else {
      el.classList.remove('closed');
      const el1: HTMLElement = document.getElementById('sidebar_main_content');
      el1.classList.add('sidebar_main_active');
      el1.classList.remove('sidebar_main_inactive');
    }
  }

}
