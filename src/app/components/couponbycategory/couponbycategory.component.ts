import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  coupons : Coupon[] = [];
  constructor(private activeRoute : ActivatedRoute, private customerService : CustomerService, private snackBar : MatSnackBar, private router : Router) { }
  toCategory(text) : Category{
    return Category.Food;
  }
  showCoupon(coupon){
    this.router.navigateByUrl("/coupon/"+coupon._id);
  }
  ngOnInit(): void {
    this.category = (<any>Category)[this.activeRoute.snapshot.params["category"]];
    this.categoryName = Category[this.category];
    this.customerService.getAllCouponsByCategory(this.category).subscribe(
      success =>{
        this.coupons = Coupon.getCoupons(success).sort( (a:Coupon,b:Coupon)=>b._bought-a._bought);
     
      },
      error => {
        let errorMessage: string = error.error;
            if (error.status == 0 || error.status == 500) {
              errorMessage = "Oops, try again later";
            }
            const snackRef = this.snackBar.open(errorMessage, "dismiss");
      }
    )
  }

}
