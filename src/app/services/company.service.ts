import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { Company } from '../models/company';
import { Coupon } from '../models/coupon';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  path = "/company"
  constructor(private client : HttpClient, private loginService : LoginService) { }
  public getCompanyDetails() {
    const path : string = this.path + "/company-details/" + this.loginService.token;
    return this.client.get<Company>(path);
  }
  public addCoupon(coupon : Coupon){
    const path = this.path + "/add-coupon/" + this.loginService.token;
    return this.client.post<Coupon>(path, coupon);
  }
  
  public updateCoupon(coupon : Coupon){
    const path = this.path + "/update-coupon/" + this.loginService.token;
    return this.client.post<Coupon>(path, coupon);
  }
  public deleteCoupon(id : number){
    let path = this.path + "/delete-coupon/" + this.loginService.token;
    path += "/"+id;
    return this.client.delete(path,{responseType:"text"});
  }
  public getAllClients(){
    const path = this.path + "/all-clients/" + this.loginService.token;
    return this.client.get<Customer[]>(path);
  }
}
