import { Component, OnInit, Input } from '@angular/core';
import { Coupon } from 'src/app/models/coupon';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/models/customer';

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
  constructor(private customerService : CustomerService) { }

  ngOnInit(): void {
    if(!this.boughtBy){
      this.customerService.getCustomersByCoupon(this.coupon._id).subscribe(
        success => {
          this.boughtBy = Customer.getCustomers(success).length;
        }
      )
    }
  }

}
