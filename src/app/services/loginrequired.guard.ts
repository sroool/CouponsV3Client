import { LoginService } from 'src/app/services/login.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginrequiredGuard implements CanActivate {
  constructor(private loginService : LoginService, private router : Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.loginService.loggedin();
      const token = sessionStorage.getItem("token") || "guest";
      if(token == "guest" ){
        
        return true;
      }
      this.router.navigateByUrl("/home");
      return true;
  }
  
}
