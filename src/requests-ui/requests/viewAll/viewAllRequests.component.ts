import {Component, OnInit} from "@angular/core";
import {RequestsService} from "../../services/requests.service";
import {Ticket} from "../../entities/ticket";
import {UserService} from "../../../dataSpaceUI/app/services/user.service";

import UIkit from 'uikit';

@Component({
  selector: 'app-requests',
  templateUrl: 'viewAllRequests.component.html',
  providers: [RequestsService]
})

export class ViewAllRequestsComponent implements OnInit {

  requests: Ticket[] = null;
  request: Ticket = null;
  message: string = null;

  constructor(private requestService: RequestsService, private userService: UserService) {
  }

  ngOnInit() {
    this.getAllRequests();
  }

  assignToMe(requestId: string) {
    console.log(requestId);
    if (this.userService.userInfo) {
      this.requestService.getRequestById(requestId).subscribe(
        res => {
          this.request = res;
          this.request.assignee = this.userService.userInfo.email;
          this.request.status = 'Assigned to ingestor';
          this.request.updated = new Date();
          this.requestService.editRequest(requestId, this.request).subscribe(
            res => {
             this.getAllRequests();
            },
            error => {
              this.message = 'Something went bad please contact the developing team';
              this.showNotification();
            }
          );
        },
        error => {
          this.message = 'Something went bad please contact the developing team';
          this.showNotification();
        }
      );
    } else {
      this.message = 'Didn\'t find user info please try logging in.';
      this.showNotification();
    }
  }

  hasRole(role: string) {
    return this.userService.userInfo?.roles.indexOf(role) > -1;
  }

  getAllRequests () {
    this.requestService.getAllRequests().subscribe(
      next => {this.requests = next},
      error => {console.log(error)}
    );
  }

  showNotification() {
    UIkit.notification({
      message: this.message, status: 'danger', pos: 'top-center', timeout: 3000
    });
  }

}
