import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {SearchQuery} from "../../domain/search-query";

@Component({
  selector: 'pages-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  title = 'catalogue-ui';

  searchForm: FormGroup;

  constructor(public fb: FormBuilder, public router: Router) {
    this.searchForm = fb.group({'query': ['']});
  }

  onSubmit(searchValue: SearchQuery) {
    // console.log('searchValue =>', searchValue);
    if(searchValue.query=='')
      return this.router.navigate(['/search']);
    return this.router.navigate(['/search', searchValue]);
  }
}
