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
    // if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    //   console.log("mobile");
    // }else{
    //   console.log("not mobile");
    // }
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.screenWidth = window.innerWidth;
    console.log(this.screenWidth);
  }

  isNotDashboard() {
    return (this.router.url.startsWith('/home')
    || this.router.url.startsWith('/search')
    || this.router.url.startsWith('/landingPage') || this.router.url.startsWith('/landing')
    || this.router.url.startsWith('/dataset'));
  }
}
