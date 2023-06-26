import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {AuthenticationService} from "./authentication.service";

@Injectable()

export class RoleAuthGuardComponent implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let url: string = state.url;
    return this.checkUserLogin(route, url);
  }

  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    if (this.authService.authenticated && this.authService.userRoles) {
      const userRoles = this.authService.userRoles;
      if (userRoles.filter(value => route.data['roles'].includes(value)).length === 0){
        this.router.navigate(['/home']);
        return false;
      }
      return true;
    }
    this.router.navigate(['/home']);
    return false;
  }
}
