import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginguardService } from './services/loginguard.service';
import { AllcompaniesComponent } from './components/allcompanies/allcompanies.component';
import { AllcustomersComponent } from './components/allcustomers/allcustomers.component';
import { MyprofileComponent } from './components/myprofile/myprofile.component';
import { CustomerprofileComponent } from './components/customerprofile/customerprofile.component';
import { CompanyprofileComponent } from './components/companyprofile/companyprofile.component';
import { CouponComponent } from './components/coupon/coupon.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';


const routes: Routes = [
  {path: "", redirectTo:"home",pathMatch:"full",canActivate : [LoginguardService]},
  {path: "home", component: HomeComponent, canActivate : [LoginguardService]},
  {path: "login", component: LoginComponent},
  {path: "all-companies", component:AllcompaniesComponent, canActivate: [LoginguardService]},
  {path: "all-customers", component:AllcustomersComponent, canActivate: [LoginguardService]},
  {path: "customer-profile", component:CustomerprofileComponent, canActivate: [LoginguardService]},
  {path: "company-profile", component:CompanyprofileComponent, canActivate: [LoginguardService]},
  {path: "coupon/:id", component: CouponComponent, canActivate: [LoginguardService]},
  {path: "**", component:PagenotfoundComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
