import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from '../models/category.enum';

@Injectable({
  providedIn: 'root'
})
export class CategoryGuard implements CanActivate {
  constructor(private router : Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let enteredCategory = next.params['category'];
    let validCategories : string[] = Object.keys(Category).filter(category=>isNaN(+category));
    if(!validCategories.includes(enteredCategory)){
      this.router.navigateByUrl("/not-found");
      return false;
    }
    return true;
  }
  
}
