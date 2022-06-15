import {Component, OnInit} from "@angular/core";
import {RequestsService} from "../../services/requests.service";
import {Ticket} from "../../entities/ticket";

@Component({
  selector: 'app-requests',
  templateUrl: 'viewAllRequests.component.html',
  providers: [RequestsService]
})

export class ViewAllRequestsComponent implements OnInit {

  requests: Ticket[] = null;

  constructor(private requestService: RequestsService) {
  }

  ngOnInit() {
    this.requestService.getAllRequests().subscribe(
      next => {this.requests = next},
      error => {console.log(error)}
    );
  }

}
