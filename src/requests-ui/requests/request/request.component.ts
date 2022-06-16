import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {From, Ticket, TicketComment} from "../../entities/ticket";
import {RequestsService} from "../../services/requests.service";
import {UserService} from "../../../dataSpaceUI/services/user.service";
import UIkit from "uikit";

@Component({
  selector: 'app-requests-ui',
  templateUrl: 'request.component.html',
  providers: [RequestsService]
})

export class RequestComponent implements OnInit{

  requestId: string = null;
  request: Ticket = null;
  comment: FormGroup;
  ready = false;
  user = {email: 'testUser@test.ts'}

  constructor(private fb: FormBuilder, private requestService: RequestsService,
              private route: ActivatedRoute, private userService: UserService) {
    this.comment = this.fb.group(new TicketComment());
    this.comment.setControl('from', this.fb.group(new From()));
    this.comment.get('text').addValidators(Validators.required);
  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.requestId = params['id'];
        this.requestService.getRequestById(this.requestId).subscribe(
          next => {this.request = next},
          error => {console.log(error)},
        () => {this.ready = true}
        );
      }
    );
  }

  addComment() {
    if (this.comment.valid) {
      this.comment.get('date').setValue(new Date());
      if (this.userService.userInfo) {
        this.comment.get('from.email').setValue(this.userService.userInfo.email);
        this.comment.get('from.firstname').setValue(this.userService.userInfo.name);
        this.comment.get('from.lastname').setValue(this.userService.userInfo.surname);
      } else {
        UIkit.notification({
          message: 'Didn\'t find user info please try logging in.', status: 'danger', pos: 'top-center', timeout: 3000
        });
      }
      this.requestService.postComment(this.requestId, this.comment.getRawValue()).subscribe(
        next => {
          this.request = next;
          this.comment.reset();
        },
        error => {console.log(error)}
      );
    } else {
      this.comment.markAllAsTouched();
      UIkit.notification({
        message: 'The marked red fields are required.', status: 'danger', pos: 'top-center', timeout: 3000
      });
    }
  }

  checkFormValidity(formControl: string): boolean {
    return (!this.comment.get(formControl).valid && this.comment.get(formControl).touched);
  }

}
