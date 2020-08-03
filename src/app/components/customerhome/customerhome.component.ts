import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { Coupon } from 'src/app/models/coupon';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/models/customer';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { Category } from 'src/app/models/category.enum';

@Component({
  selector: 'app-customerhome',
  templateUrl: './customerhome.component.html',
  styleUrls: ['./customerhome.component.css']
})
export class CustomerhomeComponent implements OnInit {
  coupons: Coupon[];
  numbers: number[] = [1,2,3];
  autoComplete : FormControl = new FormControl();
  searchOption = "All";
  categories : string[] = Object.keys(Category).filter( category => isNaN(+category) );
  optionsB : Coupon[];
  
  limitedTimeCoupons: Coupon[] = [];
  topPicksCoupons: Coupon[] = [];
  topPicksQualifier = 2;
  foodCoupons : Coupon[];
  electricityCoupons : Coupon[];
  fashionCoupons : Coupon[];
  petsCoupons : Coupon[];
  tourismCoupons : Coupon[];
  furnitureCoupons : Coupon[]
  spaCoupons : Coupon[];

  constructor(private customerService: CustomerService, private snackBar : MatSnackBar, private router : Router) { }

  clearSearch(){
    this.autoComplete.setValue('');
    this.optionsB = null;
  }
  
 
  searchListener(){
    if(this.autoComplete.value.length >=3){
      this.optionsB = this.coupons.filter( coupon =>  coupon._title.toLowerCase().includes(this.autoComplete.value)
                                          && (this.searchOption != "All" ? coupon._category.toString() == this.searchOption : true)).slice(0,6);
    }
    if(this.autoComplete.value.length < 3)
      this.optionsB = null;

  }
  sortByBought(a : Coupon, b : Coupon){
    return b._bought - a._bought;
  }
  sortByLimitedTime(a : Coupon, b:Coupon){
    return (new Date(a._endDate)).getTime() - (new Date(b._endDate)).getTime()
  }
  ngOnInit(): void {
    this.customerService.getAllCoupons().subscribe(
      success => {
        this.coupons = Coupon.getCoupons(success).sort(this.sortByBought);
        
        this.topPicksCoupons = this.coupons.slice(0,5);
        this.electricityCoupons = this.coupons.filter( coupon => coupon._category.toString() == "Electricity" ).slice(0,5);
        this.foodCoupons = this.coupons.filter( coupon => coupon._category.toString() == "Food" ).slice(0,5);
        this.spaCoupons = this.coupons.filter( coupon => coupon._category.toString() == "Spa" ).slice(0,5);
        this.petsCoupons = this.coupons.filter( coupon => coupon._category.toString() == "Pets" ).slice(0,5);
        this.tourismCoupons = this.coupons.filter( coupon => coupon._category.toString() == "Tourism" ).slice(0,5);
        this.furnitureCoupons = this.coupons.filter( coupon => coupon._category.toString() == "Furniture" ).slice(0,5);
        this.fashionCoupons = this.coupons.filter( coupon => coupon._category.toString() == "Fashion" ).slice(0,5);

        this.limitedTimeCoupons = this.coupons.filter(this.limitedTime).sort(this.sortByLimitedTime).slice(0,3);
        
      }, error => {
        if(error.status == 401){
          this.router.navigateByUrl('/home')
        }
        let errorMessage: string = error.error;
        if (error.status == 0 || error.status == 500) {
          errorMessage = "Oops, try again later";
        }
        const snackRef = this.snackBar.open(errorMessage, "dismiss");
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
  showCoupon(coupon){
    this.router.navigateByUrl("/coupon/"+coupon._id);
  }

}
