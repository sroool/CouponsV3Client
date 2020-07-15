import { Component, OnInit } from '@angular/core';
import { Coupon } from 'src/app/models/coupon';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/models/customer';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from 'src/app/models/category.enum';

@Component({
  selector: 'app-customerhome',
  templateUrl: './customerhome.component.html',
  styleUrls: ['./customerhome.component.css']
})
export class CustomerhomeComponent implements OnInit {
  coupons: Coupon[];
  autoComplete : FormControl = new FormControl();
  options : Coupon[];
  optionsObs : Observable<Coupon[]>;
  searchOption = "All";
  categories : string[] = Object.keys(Category).filter( category => isNaN(+category) );
  limitedTimeCoupons: Coupon[] = [];
  topPicksCoupons: Suggestion[] = [];
  topPicksQualifier = 2;
  foodCoupons : Suggestion[];
  electricityCoupons : Suggestion[];
  vacationCoupons : Suggestion[];
  fashionCoupons : Suggestion[];
  petsCoupons : Suggestion[];
  tourismCoupons : Suggestion[];
  furnitureCoupons : Suggestion[]
  spaCoupons : Suggestion[];

  constructor(private customerService: CustomerService) { }
  _filter(title : string ) : Coupon[]{
    const filterValue = title.toLowerCase();
    return this.options.filter( option => option._title.toLowerCase().includes(filterValue) &&
    (this.searchOption != "All" ? option._category.toString() == this.searchOption : true)
    ).slice(0,6);
  }
  display(coupon :Coupon) : string{
    return coupon && coupon._title ? coupon._title : '';
  }
  clearSearch(){
    this.autoComplete.setValue('');
    this.optionsObs = null;
  }
  clearOptions(){

  }
  overlayOff(){
    this.autoComplete.setValue('');
  }
  ngOnInit(): void {
    this.customerService.getAllCoupons().subscribe(
      success => {
        this.coupons = Coupon.getCoupons(success);
        this.options = Array.from(this.coupons);
        this.optionsObs = this.autoComplete.valueChanges.pipe(
          map( value => typeof value === 'string' ? value : value._title),
          map( title => title ? this._filter(title) : this.options.slice())
        );
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

        let foodCouponsTemp: Coupon[] = this.coupons.filter( (coupon : Coupon) => coupon._category.toString() =="Food" );
        let foodCouponsSuggestions : Suggestion[] = [];
        foodCouponsTemp.forEach( (coupon:Coupon) => {
          this.customerService.getCustomersByCoupon(coupon._id).subscribe(
            success=>{
              let customers : Customer[] = Customer.getCustomers(success);
              foodCouponsSuggestions.push({"count":customers.length,"coupon":coupon});
              foodCouponsSuggestions.sort(this.sortByCount);
              if(foodCouponsSuggestions.length >=5){
                this.foodCoupons = [];
                for(let i=0;i<5;i++){
                  this.foodCoupons.push(foodCouponsSuggestions[i])
                }
              }
            },
            error => {
              console.log(error);
            }
          )
        })

        let electricityCouponsTemp: Coupon[] = this.coupons.filter( (coupon:Coupon) => coupon._category.toString() =="Electricity");
        let electricitySuggestions : Suggestion[] = [];
        electricityCouponsTemp.forEach( (coupon:Coupon) =>{
          this.customerService.getCustomersByCoupon(coupon._id).subscribe(
            success =>{
              let customers : Customer[] = Customer.getCustomers(success);
              electricitySuggestions.push({"count":customers.length,"coupon":coupon});
              electricitySuggestions.sort(this.sortByCount);
              if(electricitySuggestions.length>=5){
                this.electricityCoupons = [];
                for(let i=0;i<5;i++){
                  this.electricityCoupons.push(electricitySuggestions[i]);
                }
              }
            },
            error =>{
              console.log(error);
            }
          )
        })

        let vacationCouponsTemp: Coupon[] = this.coupons.filter( (coupon:Coupon) => coupon._category.toString() =="Vacation");
        let vacationSuggestions : Suggestion[] = [];
        vacationCouponsTemp.forEach( (coupon:Coupon) =>{
          this.customerService.getCustomersByCoupon(coupon._id).subscribe(
            success =>{
              let customers : Customer[] = Customer.getCustomers(success);
              vacationSuggestions.push({"count":customers.length,"coupon":coupon});
              vacationSuggestions.sort(this.sortByCount);
              if(vacationSuggestions.length>=5){
                this.vacationCoupons = [];
                for(let i=0;i<5;i++){
                  this.vacationCoupons.push(vacationSuggestions[i]);
                }
              }
            },
            error =>{
              console.log(error);
            }
          )
        })

        let fashionCouponsTemp: Coupon[] = this.coupons.filter( (coupon:Coupon) => coupon._category.toString() =="Fashion");
        let fashionSuggestions : Suggestion[] = [];
        fashionCouponsTemp.forEach( (coupon:Coupon) =>{
          this.customerService.getCustomersByCoupon(coupon._id).subscribe(
            success =>{
              let customers : Customer[] = Customer.getCustomers(success);
              fashionSuggestions.push({"count":customers.length,"coupon":coupon});
              fashionSuggestions.sort(this.sortByCount);
              if(fashionSuggestions.length>=5){
                this.vacationCoupons = [];
                for(let i=0;i<5;i++){
                  this.fashionCoupons.push(fashionSuggestions[i]);
                }
              }
            },
            error =>{
              console.log(error);
            }
          )
        })

        let petsCouponsTemp: Coupon[] = this.coupons.filter( (coupon:Coupon) => coupon._category.toString() =="Pets");
        let petsSuggestions : Suggestion[] = [];
        petsCouponsTemp.forEach( (coupon:Coupon) =>{
          this.customerService.getCustomersByCoupon(coupon._id).subscribe(
            success =>{
              let customers : Customer[] = Customer.getCustomers(success);
              petsSuggestions.push({"count":customers.length,"coupon":coupon});
              petsSuggestions.sort(this.sortByCount);
              if(petsSuggestions.length>=5){
                this.vacationCoupons = [];
                for(let i=0;i<5;i++){
                  this.petsCoupons.push(petsSuggestions[i]);
                }
              }
            },
            error =>{
              console.log(error);
            }
          )
        })


        let tourismCouponsTemp: Coupon[] = this.coupons.filter( (coupon:Coupon) => coupon._category.toString() =="Tourism");
        let tourismSuggestions : Suggestion[] = [];
        tourismCouponsTemp.forEach( (coupon:Coupon) =>{
          this.customerService.getCustomersByCoupon(coupon._id).subscribe(
            success =>{
              let customers : Customer[] = Customer.getCustomers(success);
              tourismSuggestions.push({"count":customers.length,"coupon":coupon});
              tourismSuggestions.sort(this.sortByCount);
              if(tourismSuggestions.length>=5){
                this.vacationCoupons = [];
                for(let i=0;i<5;i++){
                  this.tourismCoupons.push(tourismSuggestions[i]);
                }
              }
            },
            error =>{
              console.log(error);
            }
          )
        })


        let furnitureCouponsTemp: Coupon[] = this.coupons.filter( (coupon:Coupon) => coupon._category.toString() =="Furniture");
        let furnitureSuggestions : Suggestion[] = [];
        furnitureCouponsTemp.forEach( (coupon:Coupon) =>{
          this.customerService.getCustomersByCoupon(coupon._id).subscribe(
            success =>{
              let customers : Customer[] = Customer.getCustomers(success);
              furnitureSuggestions.push({"count":customers.length,"coupon":coupon});
              furnitureSuggestions.sort(this.sortByCount);
              if(furnitureSuggestions.length>=5){
                this.vacationCoupons = [];
                for(let i=0;i<5;i++){
                  this.furnitureCoupons.push(furnitureSuggestions[i]);
                }
              }
            },
            error =>{
              console.log(error);
            }
          )
        })


        let spaCouponsTemp: Coupon[] = this.coupons.filter( (coupon:Coupon) => coupon._category.toString() =="Spa");
        let spaSuggestions : Suggestion[] = [];
        spaCouponsTemp.forEach( (coupon:Coupon) =>{
          this.customerService.getCustomersByCoupon(coupon._id).subscribe(
            success =>{
              let customers : Customer[] = Customer.getCustomers(success);
              spaSuggestions.push({"count":customers.length,"coupon":coupon});
              spaSuggestions.sort(this.sortByCount);
              if(spaSuggestions.length>=5){
                this.vacationCoupons = [];
                for(let i=0;i<5;i++){
                  this.spaCoupons.push(spaSuggestions[i]);
                }
              }
            },
            error =>{
              console.log(error);
            }
          )
        })
      }, error => {
        console.log(error);
      }
    );
  }
  sortByCount(a:Suggestion, b:Suggestion){
    return b.count - a.count;
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

