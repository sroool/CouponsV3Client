import { Component, OnInit, Input } from '@angular/core';
import { Coupon } from 'src/app/models/coupon';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/models/customer';
import { Router } from '@angular/router';
import { CouponComponent } from '../coupon/coupon.component';

@Component({
  selector: 'app-minicoupon',
  templateUrl: './minicoupon.component.html',
  styleUrls: ['./minicoupon.component.css']
})
export class MinicouponComponent implements OnInit {

  @Input()
  coupon : Coupon;
  @Input()
  boughtBy;
  @Input()
  search;
  imgPlaceHolder= "assets/product-placeholder.png";
  constructor(private customerService : CustomerService, private router : Router) { }

  ngOnInit(): void {
    if(this.coupon){
      this.imgPlaceHolder = this.coupon._image;
    }
    if(!this.boughtBy && this.coupon){
      this.customerService.getCustomersByCoupon(this.coupon._id).subscribe(
        success => {
          this.boughtBy = Customer.getCustomers(success).length;
        }
      )
    }
  }


}
