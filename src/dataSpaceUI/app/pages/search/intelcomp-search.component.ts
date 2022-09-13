import {Component} from "@angular/core";
import {SearchComponent} from "../../../catalogue-ui/pages/search/search.component";
import {SearchService} from "../../../catalogue-ui/services/search.service";

@Component({
  selector: 'pages-intelcomp-search',
  // templateUrl: '../../../catalogue-ui/pages/search/search.component.html',
  templateUrl: './intelcomp-search.component.html',
  providers: [SearchService]
})

export class IntelcompSearchComponent extends SearchComponent{
  override itemPath = '/dataset/';
  rightsFilters = [];
  languagesFilters = [];
  publisherFilters = [];

  clearFilter(e, filterType: string) {
    e.value.isChecked = false;
    let tmp = {'target': {'checked': false}};
    this.onSelection(tmp, filterType, e.value.value);
  }

  addFilter(e, filterType: string) {
    let tmp = {'target': {'checked': true}};
    this.onSelection(tmp, filterType, e.value);
  }

  // makes more sense for Search component to be implemented and not to be extended
}
