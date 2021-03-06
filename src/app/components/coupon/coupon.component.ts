import { LoginService } from 'src/app/services/login.service';
import { Component, OnInit } from '@angular/core';
import { Coupon } from 'src/app/models/coupon';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/models/customer';
import {Location} from '@angular/common'

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
  otherCustomersCoupons: Coupon[];
  purchaseAmount: number;

  countDown;

  constructor(public activeRoute: ActivatedRoute, private customerService: CustomerService,
    private dialog: MatDialog, private snackBar: MatSnackBar, private router: Router, private loginService: LoginService,
    private location : Location
    ) { 
      
    }

  ngOnInit(): void {

    this.activeRoute.paramMap.subscribe( params =>{
      this.couponId = +params.get('id');
      this.getCoupon();
    })
    
  }
  getCoupon(){
    this.customerService.getCouponById(this.couponId).subscribe(
      success => {
        this.coupon = Coupon.getCoupon(success);
        setInterval(() => {
          this.countDown = this.remainingTime();
        }, 1000);
        this.customerService.getCustomersByCoupon(this.couponId).subscribe(
          success => {
            this.otherCustomers = Customer.getCustomers(success);
            if(this.otherCustomers.length > 0){

              this.otherCustomersCoupons = this.otherCustomers.map(customer => customer._coupons).reduce((acc, curr) => acc.concat(curr));
              this.otherCustomersCoupons = this.filterDuplicates(this.otherCustomersCoupons);
              this.otherCustomersCoupons = this.otherCustomersCoupons.filter(coupon => coupon._id!=this.couponId && this.sharedCoupon(this.otherCustomers, coupon)).sort(this.sortByBought).slice(0, 5);
            }
          },
          error => {
            let errorMessage: string = error.error;
            if (error.status == 0 || error.status == 500) {
              errorMessage = "Oops, try again later";
            }
            const snackRef = this.snackBar.open(errorMessage, "dismiss");
          }
        )
      },
      error => {
        if (error.status == 400) {
          this.router.navigateByUrl("/not-found");
          return;
        } if(error.status == 401){
          this.router.navigateByUrl('/home')
        }
        let errorMessage: string = error.error;
        if (error.status == 0 || error.status == 500) {
          errorMessage = "Oops, try again later";
        }
        const snackRef = this.snackBar.open(errorMessage, "dismiss");
      }
    )
 
  }
  showCoupon(coupon){
    this.couponId = coupon._id;
  
    this.router.navigateByUrl("/coupon/"+coupon._id);
   
  }
  
  purchaseCoupon() {
    this.disableBuyButton = true;
    this.customerService.purchaseCoupon(this.coupon).subscribe(
      success => {
        const snackRef = this.snackBar.open(success, "dismiss");
      },
      error => {
        let errorMessage: string = error.error;
        if (error.status == 0 || error.status == 500) {
          errorMessage = "Oops, try again later!";
        }
        const snackRef = this.snackBar.open(errorMessage, "dismiss");
        snackRef.onAction().subscribe(() => {
          this.disableBuyButton = false;
        })
      }
    )
  }


  sharedCoupon(customers: Customer[], coupon: Coupon): boolean {
    if (customers.every(customer => customer._coupons.some(coup => coup._id == coupon._id))) {
      return true;
    }
    return false;
  }
  sortByBought(a: Coupon, b: Coupon) {
    return b._bought - a._bought;
  }
  filterDuplicates(coupons: Coupon[]) {
    let newCoupons: Coupon[] = new Array<Coupon>();
    let newCouponsId: number[] = [];
    for (let coupon of coupons) {
      if (!newCouponsId.includes(coupon._id)) {
        newCoupons.push(coupon);
        newCouponsId.push(coupon._id);
      }
    }
    return newCoupons;
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

