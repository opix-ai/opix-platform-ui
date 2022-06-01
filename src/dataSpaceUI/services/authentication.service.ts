import {Injectable} from "@angular/core";
import {deleteCookie, getCookie} from "../catalogue-ui/shared/reusable-components/cookie-management";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";


@Injectable()
export class AuthenticationService {

  base = environment.API_ENDPOINT;
  cookieName = 'AccessToken';

  constructor(private router: Router, private http: HttpClient) {
  }

  tryLogin() {
    if (getCookie(this.cookieName) === null) {
      console.log('Didn\'t find cookie, user is not logged in.' )
      sessionStorage.setItem('redirectUrl', window.location.pathname);
      this.login();
    } else {
      console.log('found cookie, user is logged in');
    }
  }

  login() {
    window.location.href = this.base + '/oauth2/authorization/cite';
  }

  logout() {
    sessionStorage.clear();
    deleteCookie(this.cookieName);
    window.location.href = this.base + '/logout';
  }

  get authenticated(): boolean {
    return getCookie(this.cookieName) !== null;
  }

  redirect() {
    if (sessionStorage.getItem('redirectUrl') !== null) {
      let url = sessionStorage.getItem('redirectUrl');
      sessionStorage.removeItem('redirectUrl');
      this.router.navigate([url]);
    }
  }

}
