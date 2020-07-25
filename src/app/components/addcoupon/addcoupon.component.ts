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
  header: string = "Add Coupon";
  newCoupon: FormGroup;
  disableDeleteButton = false;
  companyId: number;
  couponImage = new Image();
  couponImageFile: File;
  couponImageType;
  defaultImageSrc = "assets/product-placeholder.png";
  displayImageSrc;
  couponImageName;
  couponImageError = {
    couponImageSizeError: false,
    couponImageRequiredError: false,
    couponImageTypeError: false,
  }
  acceptedTypes: string[] = ['png', 'jpg', 'jpeg', 'webp'];
  possibleCategories = Object.values(Category).filter(category => isNaN(+category));
  constructor(private dialog: MatDialogRef<AddcouponComponent>,
    private companyService: CompanyService,
    private fb: FormBuilder, private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public coupon: Coupon) { }

  ngOnInit(): void {
    this.companyService.getCompanyDetails().subscribe(
      success => {
        this.companyId = Company.getCompany(success)._id;
      },
      error => {
        let errorMessage: string = error.error;
        if (error.status == 0 || error.status == 500) {
          errorMessage = "oops, try again later", "dismiss";
        }
        const snackRef = this.snackBar.open(errorMessage, "dismiss");
      }
    )
    this.displayImageSrc = this.defaultImageSrc;
    this.newCoupon = this.fb.group({
      title: ["", [Validators.required]],
      category: ["", [Validators.required]],
      description: ["", [Validators.required]],
      startDate: ["", [Validators.required, this.validateStartDate]],
      endDate: ["", [Validators.required, this.validateEndDate]],
      amount: ["", [Validators.required, Validators.min(1)]],
      price: ["", [Validators.required, Validators.min(1)]],
      image: ["", [Validators.required]]
    });

    if (this.coupon) {
      this.newCoupon.setValue({
        title: this.coupon._title, category: this.coupon._category,
        description: this.coupon._description, startDate: this.coupon._startDate,
        endDate: this.coupon._endDate, amount: this.coupon._originalAmount, price: this.coupon._price,
        image: this.coupon._imageUrlData
      });
      
      this.displayImageSrc = this.coupon._imageUrlData;
      this.header = "Update Coupon";
      for (let control in this.newCoupon.controls) {
        this.newCoupon.controls[control].markAsTouched();
      }
    }
  }
  clearImageErrors(){
    for(let error of Object.keys(this.couponImageError)){
      this.couponImageError[error] = false;
    }
  }
  validateImage(event) {
    this.clearImageErrors();
    this.couponImageFile = event.target.files[0];
    if (!this.couponImageFile){
      this.couponImageError.couponImageRequiredError = true;
      return;
    }
    this.couponImageType = this.couponImageFile.type.split("/")[1];
    if (!this.acceptedTypes.includes(this.couponImageType)) {
      this.couponImageError.couponImageTypeError = true;
      return;
    }
    let fileReader = new FileReader();
    fileReader.onload = () => {
      this.couponImage = new Image();
      this.couponImage.onload = () => {
        if (this.couponImage.width > 360 || this.couponImage.height > 360) {
          this.couponImageError.couponImageSizeError = true;
          this.displayImageSrc = this.defaultImageSrc;
          this.image.setValue("");
        } else {
          this.displayImageSrc = this.couponImage.src;
          this.image.setValue(this.couponImage.src);
          this.clearImageErrors();
        }
      }
      let src : any = fileReader.result
      this.couponImage.src  =   src;
    }
    fileReader.readAsDataURL(this.couponImageFile);

  }
  validateStartDate(control: AbstractControl) {
    const startDate = new Date(control.value);
    const today = new Date();
    const endDate = control.parent?.get("endDate");
    if (endDate && endDate.touched) {
      endDate.updateValueAndValidity();
    }
    if (startDate.getTime() < today.getTime()) {
      return { invalidStartDate: true };
    }
  }
  validateEndDate(control: AbstractControl) {
    const startDate = new Date(control.parent?.get("startDate").value);
    const endDate = new Date(control.value);
    if (startDate.getTime() > endDate.getTime()) {
      return { invalidEndDate: true };
    }
  }
  close() {
    this.dialog.close()
  }
  saveCoupon() {
    if (this.coupon) {
      this.updateCoupon();
    } else {
      this.addCoupon();
    }
  }
  addCoupon() {
    this.newCoupon.disable();
    const coupon: Coupon = new Coupon(0, this.companyId, this.category.value, this.title.value.trim(),
      this.description.value.trim(), this.startDate.value, this.endDate.value,
      this.amount.value, this.amount.value, this.price.value, this.image.value);
    this.companyService.addCoupon(coupon).subscribe(
      success => {
        const snackRef = this.snackBar.open("New Coupon added successfully", "dismiss");
        snackRef.onAction().subscribe(() => {
          this.close();
        })
      },
      error => {
        let errorMessage: string = error.error;
        if (error.status == 0 || error.status == 500) {
          errorMessage = "Oops, try again later";
        }
        const snackRef = this.snackBar.open(errorMessage, "dismiss");
        snackRef.onAction().subscribe(() => {
          this.newCoupon.enable();
        })
      }
    )
  }
  updateCoupon() {
    this.newCoupon.disable();
    this.disableDeleteButton = true;
    const coupon: Coupon = new Coupon(this.coupon._id, this.companyId, this.category.value, this.title.value,
      this.description.value, this.startDate.value, this.endDate.value,
      this.amount.value, this.amount.value, this.price.value, this.image.value);
    this.companyService.updateCoupon(coupon).subscribe(
      success => {
        const snackRef = this.snackBar.open("Coupon updated successfully", "dismiss");
        snackRef.onAction().subscribe(() => {
          this.close();
        })
      },
      error => {
        let errorMessage: string = error.error;
        if (error.status == 0 || error.status == 500) {
          errorMessage = "Oops, try again later";
        }
        const snackRef = this.snackBar.open(errorMessage, "dismiss");
        snackRef.onAction().subscribe(() => {
          this.newCoupon.enable();
          this.disableDeleteButton = false;
        })
      }
    )
  }
  deleteCoupon() {
    this.newCoupon.disable();
    this.disableDeleteButton = true;
    this.companyService.deleteCoupon(this.coupon._id).subscribe(
      success => {
        const snackRef = this.snackBar.open(success, "dismiss");
        snackRef.onAction().subscribe(() => {
          this.close();
        })
      },
      error => {
        let errorMessage = error.error;
        if (error.status == 0 || error.status == 500) {
          errorMessage = "Oops, try again later";
        }
        const snackRef = this.snackBar.open(errorMessage, "dismiss");
        snackRef.onAction().subscribe(() => {
          this.newCoupon.enable();
          this.disableDeleteButton = false;
        })
      }
    )

  }
  get id() {
    return this.newCoupon.controls['id'];
  }
  get title() {
    return this.newCoupon.controls['title'];
  }
  get description() {
    return this.newCoupon.controls['description'];
  }
  get startDate() {
    return this.newCoupon.controls['startDate'];
  }
  get endDate() {
    return this.newCoupon.controls['endDate'];
  }
  get amount() {
    return this.newCoupon.controls['amount'];
  }
  get price() {
    return this.newCoupon.controls['price'];
  }
  get category() {
    return this.newCoupon.controls['category'];
  }
  get image() {
    return this.newCoupon.controls['image'];
  }
}
