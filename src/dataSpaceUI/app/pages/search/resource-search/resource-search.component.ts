import {Component, OnInit} from "@angular/core";
import {ResourcePayloadService} from "../../../services/resource-payload.service";
import {Paging} from "../../../../catalogue-ui/domain/paging";

@Component({
  selector: 'app-tool-search',
  templateUrl: 'resource-search.component.html',
  providers: [ResourcePayloadService]
})

export class ResourceSearchComponent implements OnInit {

  payload: Paging<any> = null

  pages: number[] = [];
  pageTotal: number = 0;
  pageSize: number = 0;
  currentPage: number = 0;

  constructor(private resourcePayloadService: ResourcePayloadService) {
  }

  ngOnInit() {
    this.resourcePayloadService.getItemsByResourceType('tool').subscribe(
      next => {
        this.payload = next;
        this.pageSize = next.to - next.from;
        this.pageTotal = Math.ceil(next.total/this.pageSize);
        this.pages = Array(this.pageTotal).fill(0).map((x,i)=>i);
      }
    )
  }

  goToPage(page: number) {
    this.currentPage = page;
    // let from: number = (this.currentPage - 1) * this.pageSize
    // this.updatePagingURLParameters(from);
    // return this.navigateUsingParameters();
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      // let from: number = this.searchResults.from;
      // from -= this.pageSize;
      // this.updatePagingURLParameters(from);
      // this.navigateUsingParameters();
    }
  }

  nextPage() {
    if (this.currentPage < this.pageTotal) {
      this.currentPage++;
      // let from: number = this.searchResults.from;
      // from += this.pageSize;
      // this.updatePagingURLParameters(from);
      // this.navigateUsingParameters();
    }
  }

}
