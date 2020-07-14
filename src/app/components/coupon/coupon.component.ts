import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Coupon } from 'src/app/models/coupon';
import { ActivatedRoute, Router } from '@angular/router';
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
  disableBuyButton = false;
  otherCustomers: Customer[];
  purchaseAmount: number;

  recommended: Suggestion[] = [];
  recommendedTemp : Suggestion[] = [];
  canShowRecommended = false;
  recommendedIds: number[] = [];
  countDown;
  constructor(private activeRoute: ActivatedRoute, private customerService: CustomerService,
    private dialog: MatDialog, private snackBar: MatSnackBar, private router : Router) { }
 

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
                  this.recommendedTemp.push({ "count": -1, "coupon": coupon });
                  this.recommendedIds.push(coupon._id);
                }
              }
            }
            for(let i = 0 ; i<this.recommendedIds.length; i++){
              this.customerService.getCustomersByCoupon(this.recommendedIds[i]).subscribe(
                success => {
                  this.updateCount(this.recommendedTemp[i].coupon, Customer.getCustomers(success).length);
                 if(this.recommendedTemp.every( suggestion => suggestion.count != -1 )){
                   this.recommendedTemp.sort( (a:Suggestion,b:Suggestion) => b.count - a.count);
                   for(let i=0;i<5;i++){
                     this.recommended.push(this.recommendedTemp[i]);
                   }
                   this.canShowRecommended=true;
                 }
                 
                }, error => {
                  console.log(error);
                }
              )
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
  purchaseCoupon(){
    this.disableBuyButton = true;
    this.customerService.purchaseCoupon(this.coupon).subscribe(
      success => {
        const snackRef = this.snackBar.open(success,"dismiss");
      },
      error => {
        let errorMessage : string = error.error;
        if(error.status == 0 || error.status == 500){
          errorMessage = "Oops, try again later!";
        }
        const snackRef = this.snackBar.open(errorMessage,"dismiss");
        snackRef.onAction().subscribe( ()=>{
          this.disableBuyButton = false;
        })
      }
    )
  }
  
  updateCount(coupon: Coupon, amount: number) {
    for (let suggestion of this.recommendedTemp) {
      if (suggestion.coupon._id == coupon._id) {
        suggestion.count = amount;
        break;
      }
    }

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
    return timeLeftHours + ":" + timeLeftMinutes + ":" + timeLeftSeconds;
  }
}
class Suggestion {
  constructor(public count: number, public coupon: Coupon) { }

}
