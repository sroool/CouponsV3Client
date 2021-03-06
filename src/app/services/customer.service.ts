import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { Customer } from '../models/customer';
import { Coupon } from '../models/coupon';
import { Category } from '../models/category.enum';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  path = "/customer"
  constructor(private client : HttpClient, private loginService : LoginService) { }
  public getCustomerDetails(){
    const path : string = this.path + "/customer-details/" + this.loginService.token;
    return this.client.get<Customer>(path);
  }

  public getCouponById(id : number){
    let path = this.path + "/coupon-by-id/" + this.loginService.token;
    path += "/" + id;
    return this.client.get<Coupon>(path);
  }
  public getCustomersByCoupon(id : number){
    let path = this.path + "/customers-by-coupon/" + this.loginService.token;
    path += "/" + id;
    return this.client.get<Customer[]>(path);
  }
  public getAllCoupons(){
    let path = this.path + "/all-coupons/" + this.loginService.token;
    return this.client.get<Coupon[]>(path);
  }
  public getAllCouponsByCategory(category : Category){
    let path = this.path + "/coupons-by-category/" + this.loginService.token;
    return this.client.post<Coupon[]>(path, category);
  }
  public purchaseCoupon(coupon : Coupon){
    let path = this.path + "/purchase-coupon/" + this.loginService.token;
    return this.client.post(path, coupon, {responseType: "text"});
  }
}
