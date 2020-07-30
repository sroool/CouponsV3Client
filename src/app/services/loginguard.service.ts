import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginguardService implements CanActivate{

  constructor(private loginService : LoginService, private router :Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    
    
    this.loginService.loggedin();
    const token = sessionStorage.getItem("token") || "guest";
    if(token == "guest" ){
      this.router.navigateByUrl("/login");
      return false;
    }
    return true;
  }
}
