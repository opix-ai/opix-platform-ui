import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'intelcomp-catalogue-ui';

  open: boolean = true;

  constructor(private router: Router) {}

  isHome() {
    return (this.router.url.startsWith('/home'));
  }
}
