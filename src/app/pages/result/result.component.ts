import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'result-page',
  templateUrl: 'result.component.html'
})

export class ResultComponent implements OnInit {
  id: string = null;
  base: string = 'https://gateway.opix.ai/sti-viewer/embedded-dashboard?tenant=main&apikey=71GC0X4KAyfSdzDKP3xC4kDv0gtrpNEyOkXGGMPPiNRSgeGUT3fm852DQbAt1GfE&params=';
  url: string = null;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.url = this.base + encodeURIComponent('{"keywordFilters":[{"field":"analysis_id","values":["job_35"]}],"dashboard":"job_35"}')
      console.log(this.id);
      console.log(this.url);
    });
  }
}
