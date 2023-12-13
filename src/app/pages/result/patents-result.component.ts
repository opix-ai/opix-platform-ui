import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {InputService} from "../../services/input.service";
import {BrowseJob} from "../../../dataSpaceUI/app/domain/job";
import {PatentsTableColumns} from "../../domain/patents-table-columns";

@Component({
  selector: 'patents-result-page',
  templateUrl: 'patents-result.component.html',
  styleUrls: ['patents-result.component.css']
})

export class PatentsResultComponent implements OnInit {
  id: string = null;
  base: string = 'https://gateway.opix.ai/sti-viewer/embedded-dashboard?tenant=main&apikey=71GC0X4KAyfSdzDKP3xC4kDv0gtrpNEyOkXGGMPPiNRSgeGUT3fm852DQbAt1GfE&params=';
  url: string = null;
  job: BrowseJob = null;

  patentsTableColumns: PatentsTableColumns = new PatentsTableColumns();
  tableView : string = 'default';

  constructor(private route: ActivatedRoute, private inputService: InputService) {
  }

  ngOnInit() {
    this.patentsTableColumnsInit();

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

  changeTableView(view: string) {
    this.tableView = view;
  }

  patentsTableColumnsInit() {
    this.patentsTableColumns.applicationNumber = true;
    this.patentsTableColumns.applicationAuthority = true;
    this.patentsTableColumns.earliestFilingDate = true;
    this.patentsTableColumns.granted = true;
    this.patentsTableColumns.typeOfIPR = true;
    this.patentsTableColumns.simpleFamilySize = true;
    this.patentsTableColumns.classification = true;
    this.patentsTableColumns.applicants = true;
    this.patentsTableColumns.inventors = true;
  }

  changeApplicationNumberColumn(event) {
    this.patentsTableColumns.applicationNumber = !!event.target.checked;
  }

  changeApplicationAuthorityColumn(event) {
    this.patentsTableColumns.applicationAuthority = !!event.target.checked;
  }

  changeEarliestFilingDateColumn(event) {
    this.patentsTableColumns.earliestFilingDate = !!event.target.checked;
  }

  changeGrantedColumn(event) {
    this.patentsTableColumns.granted = !!event.target.checked;
  }

  changeTypeOfIPRColumn(event) {
    this.patentsTableColumns.typeOfIPR = !!event.target.checked;
  }

  changeSimpleFamilySizeColumn(event) {
    this.patentsTableColumns.simpleFamilySize = !!event.target.checked;
  }

  changeClassificationColumn(event) {
    this.patentsTableColumns.classification = !!event.target.checked;
  }

  changeApplicantsColumn(event) {
    this.patentsTableColumns.applicants = !!event.target.checked;
  }

  changeInventorsColumn(event) {
    this.patentsTableColumns.inventors = !!event.target.checked;
  }

}
