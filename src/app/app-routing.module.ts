import { LoginrequiredGuard } from './services/loginrequired.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LoginguardService } from './services/loginguard.service';
import { AllcompaniesComponent } from './components/allcompanies/allcompanies.component';
import { AllcustomersComponent } from './components/allcustomers/allcustomers.component';
import { CustomerprofileComponent } from './components/customerprofile/customerprofile.component';
import { CompanyprofileComponent } from './components/companyprofile/companyprofile.component';
import { CouponComponent } from './components/coupon/coupon.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { LoadingComponent } from './components/loading/loading.component';
import { CouponbycategoryComponent } from './components/couponbycategory/couponbycategory.component';
import { CategoryGuard } from './services/category.guard';


const routes: Routes = [
  {path: "", redirectTo:"home",pathMatch:"full",canActivate : [LoginguardService]},
  {path: "home", component: HomeComponent, canActivate : [LoginguardService]},
  {path: "login", component: LoginComponent, canActivate: [LoginrequiredGuard]},
  {path: "all-companies", component:AllcompaniesComponent, canActivate: [LoginguardService]},
  {path: "all-customers", component:AllcustomersComponent, canActivate: [LoginguardService]},
  {path: "customer-profile", component:CustomerprofileComponent, canActivate: [LoginguardService]},
  {path: "company-profile", component:CompanyprofileComponent, canActivate: [LoginguardService]},
  {path: "loading/:id", component: LoadingComponent, canActivate: [LoginguardService]},
  {path: "coupon/:id", component: CouponComponent, canActivate: [LoginguardService]},
  {path: "category/:category",component:CouponbycategoryComponent, canActivate: [LoginguardService,CategoryGuard]},
  { path: "not-found" , component:PagenotfoundComponent},
  {path: "**", component:PagenotfoundComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
