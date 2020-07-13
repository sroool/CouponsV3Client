import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CompanyService } from 'src/app/services/company.service';
import { Coupon } from 'src/app/models/coupon';
import { Category } from 'src/app/models/category.enum';
import { Company } from 'src/app/models/company';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-addcoupon',
  templateUrl: './addcoupon.component.html',
  styleUrls: ['./addcoupon.component.css']
})
export class AddcouponComponent implements OnInit {
  header : string = "Add Coupon";
  newCoupon : FormGroup;
  disableDelete = false;
  companyId : number;
  possibleCategories = Object.values(Category).filter(category => isNaN(+category));
  constructor(private dialog : MatDialogRef<AddcouponComponent>,
              private companyService : CompanyService,
              private fb : FormBuilder, private snackBar : MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public coupon : Coupon) { }

  ngOnInit(): void {
    this.companyService.getCompanyDetails().subscribe(
      success => {
        this.companyId = Company.getCompany(success)._id;
      },
      error =>{
        console.log(error);
      }
    )
    this.newCoupon = this.fb.group({
      title: ["",[Validators.required]],
      category: ["",[Validators.required]],
      description: ["",[Validators.required]],
      startDate: ["",[Validators.required,this.validateStartDate]],
      endDate: ["",[Validators.required,this.validateEndDate]],
      amount: ["",[Validators.required,Validators.min(1)]],
      price: ["",[Validators.required,Validators.min(1)]],
      image: ["",[Validators.required]]
    });
    if(this.coupon){
      this.newCoupon.setValue({title: this.coupon._title,category: this.coupon._category,
                              description: this.coupon._description,startDate:this.coupon._startDate,
                              endDate:this.coupon._endDate,amount:this.coupon._amount,price:this.coupon._price,
                              image:this.coupon._image});
      this.header = "Update Coupon";
      for(let control in this.newCoupon.controls){
        this.newCoupon.controls[control].markAsTouched();
      }
    }
  }
  validateStartDate(control : AbstractControl){
    const startDate = new Date(control.value);
    const today = new Date();
    const endDate = control.parent?.get("endDate");
    if(endDate && endDate.touched){
      endDate.updateValueAndValidity();
    }
    if(startDate.getTime() < today.getTime()){
      return {invalidStartDate:true};
    }
  }
  validateEndDate(control : AbstractControl){
    const startDate = new Date(control.parent?.get("startDate").value);
    const endDate = new Date(control.value);
    if(startDate.getTime() > endDate.getTime()){
      return {invalidEndDate:true};
    }
  }
  close(){
    this.dialog.close()
  }
  saveCoupon(){
    if(this.coupon){
      this.updateCoupon();
    }else{
      this.addCoupon();
    }
  }
  addCoupon(){
    this.newCoupon.disable();
    const category : Category = this.category.value;
    const coupon : Coupon = new Coupon(0, this.companyId,this.category.value,this.title.value,
                                        this.description.value,this.startDate.value,this.endDate.value,
                                        this.amount.value,this.price.value,this.image.value);
    this.companyService.addCoupon(coupon).subscribe(
      success => {
        const snackRef = this.snackBar.open("New Coupon added successfully","dismiss");
        snackRef.onAction().subscribe( ()=>{
          this.close();
        })
      },
      error => {
        let errorMessage : string = error.error;
        if(error.status ==0 || error.status ==500){
          errorMessage = "Oops, try again later";
        }
        const snackRef = this.snackBar.open(errorMessage,"dismiss");
        snackRef.onAction().subscribe( ()=>{
          this.newCoupon.enable();
        })
      }
    )
  }
  updateCoupon(){
    this.newCoupon.disable();
    const coupon : Coupon = new Coupon(this.coupon._id, this.companyId,this.category.value,this.title.value,
                                        this.description.value,this.startDate.value,this.endDate.value,
                                        this.amount.value,this.price.value,this.image.value);
    this.companyService.updateCoupon(coupon).subscribe(
      success => {
        const snackRef = this.snackBar.open("Coupon updated successfully","dismiss");
        snackRef.onAction().subscribe( ()=>{
          this.close();
        })
      },
      error => {
        let errorMessage : string = error.error;
        if(error.status ==0 || error.status ==500){
          errorMessage = "Oops, try again later";
        }
        const snackRef = this.snackBar.open(errorMessage,"dismiss");
        snackRef.onAction().subscribe( ()=>{
          this.newCoupon.enable();
        })
      }
    )
  }
  deleteCoupon(){
    this.newCoupon.disable();
    this.disableDelete = true;
    this.companyService.deleteCoupon(this.coupon._id).subscribe(
      success => {
        const snackRef = this.snackBar.open(success,"dismiss");
        snackRef.onAction().subscribe( ()=>{
          this.close();
        })
      },
      error => {
        let errorMessage = error.error;
        if(error.status == 0 || error.status == 500){
          errorMessage = "Oops, try again later";
        }
        const snackRef = this.snackBar.open(errorMessage, "dismiss");
        snackRef.onAction().subscribe( ()=>{
          this.newCoupon.enable();
        })
      }
    )
    
  }
  get id(){
    return this.newCoupon.controls['id'];
  }
  get title(){
    return this.newCoupon.controls['title'];
  }
  get description(){
    return this.newCoupon.controls['description'];
  }
  get startDate(){
    return this.newCoupon.controls['startDate'];
  }
  get endDate(){
    return this.newCoupon.controls['endDate'];
  }
  get amount(){
    return this.newCoupon.controls['amount'];
  }
  get price(){
    return this.newCoupon.controls['price'];
  }
  get category(){
    return this.newCoupon.controls['category'];
  }
  get image(){
    return this.newCoupon.controls['image'];
  }
}
