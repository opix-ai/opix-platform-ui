import {Component, OnInit} from "@angular/core";
import {WorkflowDatasetsService} from "../../../services/workflow-datasets.service";
import {Paging} from "../../../../dataSpaceUI/catalogue-ui/domain/paging";
import {Dataset} from "../../../domain/dataset";

@Component({
  selector: 'my-datasets',
  templateUrl: 'my-datasets.component.html'
})

export class MyDatasetsComponent implements OnInit {

  datasets: Paging<Dataset> = null;

  // Paging
  pageSize = 10;
  totalPages = 0;
  currentPage = 1;
  pageTotal: number;
  pages: number[] = [];
  offset = 2;

  dummy: any[] = [
    {
      id: "string",
      name: "string",
      description: "string",
      usages: [
        "string"
      ],
      owner: "string",
      creationDate: "2023-07-11T11:42:53.952Z",
      createdBy: "string",
      modificationDate: "2023-07-11T11:42:53.952Z",
      modifiedBy: "string"
    },
    {
      id: "string",
      name: "string",
      description: "string",
      usages: [
        "string"
      ],
      owner: "string",
      creationDate: "2023-07-11T11:42:53.952Z",
      createdBy: "string",
      modificationDate: "2023-07-11T11:42:53.952Z",
      modifiedBy: "string"
    }
  ]

  constructor(private workflowService: WorkflowDatasetsService) {}

  ngOnInit() {
    this.workflowService.getDatasets().subscribe(
      res=> {
          this.datasets = res;
          this.paginationInit();
        },
      error => {console.error(error)}
    );
  }

  paginationInit() {
    let addToEndCounter = 0;
    let addToStartCounter = 0;
    this.pages = [];
    this.currentPage = (this.datasets.from / this.pageSize) + 1;
    this.pageTotal = Math.ceil(this.datasets.total / this.pageSize);
    for ( let i = (+this.currentPage - this.offset); i < (+this.currentPage + 1 + this.offset); ++i ) {
      if ( i < 1 ) { addToEndCounter++; }
      if ( i > this.pageTotal ) { addToStartCounter++; }
      if ((i >= 1) && (i <= this.pageTotal)) {
        this.pages.push(i);
      }
    }
    for ( let i = 0; i < addToEndCounter; ++i ) {
      if (this.pages.length < this.pageTotal) {
        this.pages.push(this.pages.length + 1);
      }
    }
    for ( let i = 0; i < addToStartCounter; ++i ) {
      if (this.pages[0] > 1) {
        this.pages.unshift(this.pages[0] - 1 );
      }
    }
  }

}
