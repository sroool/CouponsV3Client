import { Component, OnInit } from '@angular/core';
import { Coupon } from 'src/app/models/coupon';
import { ActivatedRoute } from '@angular/router';
import { CouponService } from 'src/app/services/coupon.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})

export class CouponComponent implements OnInit {
  coupon: Coupon;
  couponId: number;
  otherCustomers: Customer[];
  purchaseAmount: number;
  recommended: Suggestion[] = [];
  recommendedIds : number[] = [];
  countDown;
  constructor(private activeRoute: ActivatedRoute, private customerService: CustomerService,
    private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.couponId = this.activeRoute.snapshot.params['id'];
    this.customerService.getCouponById(this.couponId).subscribe(
      success => {
        this.coupon = Coupon.getCoupon(success);
        setInterval(() => {
          this.countDown = this.remainingTime();
        }, 1000);
        this.customerService.getCustomersByCoupon(this.couponId).subscribe(
          success => {
            this.otherCustomers = Customer.getCustomers(success);
            this.purchaseAmount = this.otherCustomers.length;
            for (let customer of this.otherCustomers) {
              for (let coupon of customer._coupons) {
                if (!this.recommendedIds.includes(coupon._id)) {
                  this.recommended.push({"count":0,"coupon": coupon});
                  this.recommendedIds.push(coupon._id);
                  this.customerService.getCustomersByCoupon(coupon._id).subscribe(
                    success => {
                      this.updateCount(coupon,Customer.getCustomers(success).length);

                    }, error => {
                      console.log(error);
                    }
                  )
                }
              }
            }
          },
          error => {
            console.log(error);
          }
        )
      },
      error => {
        console.log(error);
      }
    )
  }
  updateCount(coupon : Coupon, amount : number){
    for(let suggestion of this.recommended){
      if(suggestion.coupon._id == coupon._id){
        suggestion.count = amount;
        break;
      }
    }

  }
  showSuggestions(){
    console.log(this.recommended);
  }
  limitedTime() {
    const endDate: Date = new Date(this.coupon?._endDate);
    const now: Date = new Date();
    return endDate.getTime() - now.getTime() <= 1000 * 60 * 60 * 72;
  }
  remainingTime() {
    const timeLeftMillis = new Date(this.coupon?._endDate).getTime() - (new Date()).getTime();
    let timeLeftSeconds = Math.floor(timeLeftMillis / 1000).toString();
    let timeLeftHours = Math.floor(+timeLeftSeconds / 3600).toString();
    let timeLeftMinutes = Math.floor((+timeLeftSeconds - (+timeLeftHours * 3600)) / 60).toString();
    timeLeftSeconds = Math.floor(+timeLeftSeconds - (+timeLeftHours * 3600) - (+timeLeftMinutes * 60)).toString();
    timeLeftHours = timeLeftHours.length == 1 ? "0" + timeLeftHours : timeLeftHours;
    timeLeftMinutes = timeLeftMinutes.length == 1 ? "0" + timeLeftMinutes : timeLeftMinutes;
    timeLeftSeconds = timeLeftSeconds.length == 1 ? "0" + timeLeftSeconds : timeLeftSeconds;
    return  timeLeftHours + ":" + timeLeftMinutes + ":" + timeLeftSeconds;
  }
}
class Suggestion {
  constructor(public count: number, public coupon: Coupon) { }

}
