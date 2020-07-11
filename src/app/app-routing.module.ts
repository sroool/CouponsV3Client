import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginguardService } from './services/loginguard.service';
import { AllcompaniesComponent } from './components/allcompanies/allcompanies.component';
import { AllcustomersComponent } from './components/allcustomers/allcustomers.component';


const routes: Routes = [
  {path: "", redirectTo:"home",pathMatch:"full",canActivate : [LoginguardService]},
  {path: "home", component: HomeComponent, canActivate : [LoginguardService]},
  {path: "login", component: LoginComponent},
  {path: "all-companies", component:AllcompaniesComponent, canActivate: [LoginguardService]},
  {path: "all-customers", component:AllcustomersComponent, canActivate: [LoginguardService]},
  {path: "**", component: LoginComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
