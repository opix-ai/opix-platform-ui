import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../dataSpaceUI/app/services/authentication.service";
import { HostListener } from "@angular/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'opix-catalogue-ui';

  open: boolean = true;

  // screenHeight: number;
  screenWidth: number;

  constructor(private router: Router, private authService: AuthenticationService) {
    this.authService.redirect();

    this.getScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.screenWidth = window.innerWidth;
    // this.screenHeight = window.innerHeight;
    // console.log(this.screenWidth);
  }

  isNotDashboard() {
    return (this.router.url.startsWith('/home')
    || this.router.url.startsWith('/search') || this.router.url.startsWith('/resource')
    || this.router.url.startsWith('/landingPage') || this.router.url.startsWith('/landing'));
  }
}
