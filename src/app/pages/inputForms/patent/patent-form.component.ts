import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

declare var UIkit: any;

@Component({
  selector: 'patent-with-file-upload',
  templateUrl: 'patent-form.component.html'
})

export class PatentFormComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {

    UIkit.modal('#modal-input').show();
  }

  navigateBack() {
    if (sessionStorage.getItem('returnUrl')) {
      this.router.navigate([sessionStorage.getItem('returnUrl')]);
      return;
    }
    this.router.navigate(['/dashboard']);
  }

}
