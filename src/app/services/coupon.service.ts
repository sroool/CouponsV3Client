import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { Coupon } from '../models/coupon';

@Injectable({
  providedIn: 'root'
})
export class CouponService {
  path = "http://localhost:8080/coupons";
  constructor(private client : HttpClient, private loginService : LoginService) { }

  
}
