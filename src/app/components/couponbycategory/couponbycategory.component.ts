import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { Category } from 'src/app/models/category.enum';
import { Coupon } from 'src/app/models/coupon';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-couponbycategory',
  templateUrl: './couponbycategory.component.html',
  styleUrls: ['./couponbycategory.component.css']
})
export class CouponbycategoryComponent implements OnInit {
  category : Category;
  categoryName : string;
  coupons : Suggestion[] = [];
  constructor(private activeRoute : ActivatedRoute, private customerService : CustomerService) { }
  toCategory(text) : Category{
    return Category.Food;
  }
  ngOnInit(): void {
    let elec : Category = (<any>Category)['Food'];
    this.category = (<any>Category)[this.activeRoute.snapshot.params["category"]];
    this.categoryName = Category[this.category];
    this.customerService.getAllCouponsByCategory(this.category).subscribe(
      success =>{
        let couponsTemp = Coupon.getCoupons(success);
        
        couponsTemp.forEach( coupon => {
          this.customerService.getCustomersByCoupon(coupon._id).subscribe(
            success => {
              let customersTemp : Customer[] = Customer.getCustomers(success);
              this.coupons.push({"count":customersTemp.length,"coupon":coupon});
              this.coupons.sort( (a:Suggestion,b:Suggestion)=>b.count-a.count);
            }
          )
        })
      }
    )
  }

}
class Suggestion {
  constructor(public count: number, public coupon: Coupon) { }

}