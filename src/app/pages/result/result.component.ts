import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {InputService} from "../../services/input.service";
import {BrowseJob} from "../../../dataSpaceUI/app/domain/job";

@Component({
  selector: 'result-page',
  templateUrl: 'result.component.html'
})

export class ResultComponent implements OnInit {
  id: string = null;
  base: string = 'https://gateway.opix.ai/sti-viewer/embedded-dashboard?tenant=main&apikey=71GC0X4KAyfSdzDKP3xC4kDv0gtrpNEyOkXGGMPPiNRSgeGUT3fm852DQbAt1GfE&params=';
  url: string = null;
  job: BrowseJob = null;

  constructor(private route: ActivatedRoute, private inputService: InputService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.url = this.base + encodeURIComponent(`{"keywordFilters":[{"field":"analysis_id","values":["${this.id}"]}],"dashboard":"${this.id}"}`);
      this.inputService.getJobById([this.id]).subscribe(
        res => {
          this.job = res[0];
          this.job.callerAttributesObj = JSON.parse(this.job.callerAttributes);
        }, error => {console.log(error)}
      );
    });
  }

  getWorkflowType(obj: object) {
    for (const [key, value] of Object.entries(obj)) {
      for (const [subKey, subValue] of Object.entries(value)) {
        if (subKey === 'workflowType') {
          return subValue;
        }
      }
    }
  }
}
