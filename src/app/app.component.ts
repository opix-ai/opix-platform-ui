import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../dataSpaceUI/app/services/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'intelcomp-catalogue-ui';

  open: boolean = true;

  constructor(private router: Router, private authService: AuthenticationService) {
    this.authService.redirect();
  }

  isNotDashboard() {
    return (this.router.url.startsWith('/home')
    || this.router.url.startsWith('/search')
    || this.router.url.startsWith('/landingPage')
    || this.router.url.startsWith('/dataset'));
  }
}
