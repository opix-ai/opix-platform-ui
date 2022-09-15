import {Component, OnInit} from "@angular/core";
import {ResourcePayloadService} from "../../../services/resource-payload.service";
import {Paging} from "../../../../catalogue-ui/domain/paging";
import {ActivatedRoute, Router} from "@angular/router";
import {URLParameter} from "../../../../catalogue-ui/domain/url-parameter";

@Component({
  selector: 'app-tool-search',
  templateUrl: 'resource-search.component.html',
  providers: [ResourcePayloadService]
})

export class ResourceSearchComponent implements OnInit {

  resourceType: string = null;
  payload: Paging<any> = null
  urlParameters: {key: string, values: string[]}[] = [];

  pages: number[] = [];
  pageTotal: number = 0;
  pageSize: number = 10;
  currentPage: number = 0;

  searchQuery: string = null;

  constructor(private resourcePayloadService: ResourcePayloadService, private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.resourceType = params['resourceType'];
      this.resourcePayloadService.getItemsByResourceType(params['resourceType']).subscribe(
        next => {
          this.payload = next;
          this.initPagination(this.payload.from, this.payload.total);
        },
        error => {console.log(error)},
        () => {}
      );
      this.route.queryParams.subscribe(params => {
        for (const [key, value] of Object.entries(params)) {
          if (key === 'query') {
            this.searchQuery = value;
          }
        }
        this.resourcePayloadService.getItemsWithQueryParams(this.resourceType, params).subscribe(
          next => {
            this.payload = next;
            this.initPagination(this.payload.from, this.payload.total);
          },
          error => {console.log(error)},
          () => {}
        )
      })
    });

  }

  updateURLParameters(key, value) {
    for (const urlParameter of this.urlParameters) {
      if (urlParameter.key === key) {
        urlParameter.values = [value];
        return;
      }
    }
    this.urlParameters.push({key: key, values: [value]});
  }

  navigateUsingParameters() {
    const map: { [name: string]: string; } = {};
    for (const urlParameter of this.urlParameters) {
      map[urlParameter.key] = urlParameter.values.join(',');
    }
    return this.router.navigate(['/search/tool'], {queryParams: map});
  }

  initPagination(from, total) {
    this.currentPage = from / this.pageSize;
    this.pageTotal = Math.ceil(total/this.pageSize);
    this.pages = Array(this.pageTotal).fill(1).map((x,i)=>i);
  }

  goToPage(page: number) {
    this.currentPage = page;
    let from: number = (this.currentPage) * this.pageSize
    this.updateURLParameters('from', from);
    return this.navigateUsingParameters();
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      let from: number = (this.currentPage) * this.pageSize;
      this.updateURLParameters('from', from);
      this.navigateUsingParameters();
    }
  }

  nextPage() {
    if (this.currentPage < this.pageTotal-1) {
      this.currentPage++;
      let from: number = (this.currentPage) * this.pageSize;
      this.updateURLParameters('from', from);
      this.navigateUsingParameters();
    }
  }

  searchOnEnter(e) {
    if(e.key === 'Enter') {
      console.log(this.searchQuery);
      // returning false will prevent the event from bubbling up.
      this.updateURLParameters('query', this.searchQuery);
      this.navigateUsingParameters();
      return false;
    } else{
      return true;
    }
  }

}
