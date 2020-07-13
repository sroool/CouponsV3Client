import { Component, OnInit } from '@angular/core';
import { Coupon } from 'src/app/models/coupon';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-customerhome',
  templateUrl: './customerhome.component.html',
  styleUrls: ['./customerhome.component.css']
})
export class CustomerhomeComponent implements OnInit {
  coupons: Coupon[];
  limitedTimeCoupons: Coupon[] = [];
  topPicksCoupons: Suggestion[] = [];
  topPicksQualifier = 2;
  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.customerService.getAllCoupons().subscribe(
      success => {
        this.coupons = Coupon.getCoupons(success);
        let limitedTimeCouponsTemp: Coupon[] = this.coupons.filter(this.limitedTime);
        limitedTimeCouponsTemp.sort((a: Coupon, b: Coupon) => (new Date(a._endDate)).getTime() - (new Date(b._endDate)).getTime());
        for (let i = 0; i < 3 && i < limitedTimeCouponsTemp.length; i++) {

          this.limitedTimeCoupons.push(limitedTimeCouponsTemp[i]);
        }
        let topPicksCouponsTemp: Suggestion[] = [];
        this.coupons.forEach(coupon => {
          this.customerService.getCustomersByCoupon(coupon._id).subscribe(
            success => {
              let customers: Customer[] = Customer.getCustomers(success);
              if (customers.length >= this.topPicksQualifier) {
                topPicksCouponsTemp.push({ "count": customers.length, "coupon": coupon });
                topPicksCouponsTemp.sort( (a:Suggestion,b:Suggestion)=>b.count - a.count );
              }
              if(topPicksCouponsTemp.length >= 5){
                this.topPicksCoupons = [];
                for(let i=0;i<5;i++){
                  this.topPicksCoupons.push(topPicksCouponsTemp[i])
                }
              }
            }, error => {
              console.log(error);
            }
          );
        }
        )
      }, error => {
        console.log(error);
      }
    );
  }
  limitedTime(coupon: Coupon) {
    const endDate: Date = new Date(coupon._endDate);
    const today: Date = new Date();
    if (endDate.getTime() - today.getTime() <= 1000 * 60 * 60 * 72) {
      return true;
    }
    return false;
  }
  topPicks(coupon: Coupon) {
    this.customerService.getCustomersByCoupon(coupon._id).subscribe(
      success => {

      }
    )
  }

}
class Suggestion {
  constructor(public count: number, public coupon: Coupon) { }

}

