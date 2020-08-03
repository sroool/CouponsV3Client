import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginService } from './login.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginguardService implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    return this.loginService.loggedin().pipe(
      map(success => {
        this.loginService.clientType = success;
        this.loginService.authenticated = 2;
        const cantAdmin = (this.currentPath(route) == 'all-companies' || this.currentPath(route) == 'all-customers') && this.loginService.clientType != 'Administrator' ? true : false;
        const cantCompany = (this.currentPath(route) == 'company-profile') && this.loginService.clientType != 'Company' ? true : false;
        const cantCustomer = ( this.currentPath(route) == 'customer-home' ||
          this.currentPath(route) == 'category' || this.currentPath(route) == 'coupon') && this.loginService.clientType != 'Customer' ? true : false;
        if (cantAdmin || cantCompany || cantCustomer) {
          this.router.navigateByUrl("/not-found");
          return false;
        }
        return true
      }),
      catchError(error => {
        this.loginService.authenticated = 1;
        this.router.navigateByUrl("/login");
        sessionStorage.setItem("token", "guest");
        return of(false);
      })
    );

  }
  currentPath(route) {
    return route.url[0].path;
  }
}
