import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {ResourcePayloadService} from "../../../services/resource-payload.service";

@Component({
  selector: 'app-payload-landing',
  templateUrl: 'payload.component.html',
  providers: [ResourcePayloadService]
})

export class PayloadComponent implements OnInit{

  payload = null;
  resourceType: string = null;

  constructor(private route: ActivatedRoute, private resourcePayloadService: ResourcePayloadService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params);
      this.resourceType = params['resourceType'];
      this.resourcePayloadService.getItem(params['resourceType'], params['identifierValue']).subscribe(
        next => {
          console.log(next);
          this.payload = next;
        },
        error => {console.log(error);}
      );
    })
  }
}
