import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'pages-app-root',
  templateUrl: './dataSpaceUI.component.html',
  styleUrls: ['./dataSpaceUI.component.scss']
})
export class DataSpaceUIComponent {
  title = 'catalogue-ui';

  open: boolean = true;

  constructor(private router: Router) {}

  isHome() {
    return (this.router.url.startsWith('/home'));
  }
}
