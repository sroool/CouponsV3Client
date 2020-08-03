import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatDialogModule } from "@angular/material/dialog";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatMenuModule } from "@angular/material/menu";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator"
import { MatTabsModule} from '@angular/material/tabs';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatAutocompleteModule } from "@angular/material/autocomplete";


import { AllcompaniesComponent } from './components/allcompanies/allcompanies.component';
import { AllcustomersComponent } from './components/allcustomers/allcustomers.component';
import { AddcompanyComponent } from './components/addcompany/addcompany.component';
import { AddcustomerComponent } from './components/addcustomer/addcustomer.component';
import { CustomerprofileComponent } from './components/customerprofile/customerprofile.component';
import { CompanyprofileComponent } from './components/companyprofile/companyprofile.component';
import { AddcouponComponent } from './components/addcoupon/addcoupon.component';
import { CustomerhomeComponent } from './components/customerhome/customerhome.component';
import { CompanyhomeComponent } from './components/companyhome/companyhome.component';
import { AdminhomeComponent } from './components/adminhome/adminhome.component';
import { CouponComponent } from './components/coupon/coupon.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { MinicouponComponent } from './components/minicoupon/minicoupon.component';
import { CouponbycategoryComponent } from './components/couponbycategory/couponbycategory.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
  
    AllcompaniesComponent,
    AllcustomersComponent,
    AddcompanyComponent,
    AddcustomerComponent,
    
    CustomerprofileComponent,
    CompanyprofileComponent,
    AddcouponComponent,
    CustomerhomeComponent,
    CompanyhomeComponent,
    AdminhomeComponent,
    CouponComponent,
    PagenotfoundComponent,
    MinicouponComponent,
    CouponbycategoryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule, 
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTabsModule,
    MatDatepickerModule,
    MatAutocompleteModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
