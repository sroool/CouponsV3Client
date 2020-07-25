import { Component, OnInit, Input } from '@angular/core';
import { Coupon } from 'src/app/models/coupon';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/models/customer';
import { Router } from '@angular/router';
import { EventEmitter,Output } from '@angular/core';

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
  @Output() 
  selectedCoupon = new EventEmitter();
  imgPlaceHolder= "assets/product-placeholder.png";
  constructor(private customerService : CustomerService, private router : Router) { }

  selectCoupon(){
    
    this.selectedCoupon.emit(this.coupon);
  }
  ngOnInit(): void {
    if(this.coupon){
      this.imgPlaceHolder = this.coupon._imageUrlData;
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
