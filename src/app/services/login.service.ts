import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import { ClientType } from './client-type.enum';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  path = "http://localhost:8080/login";
  authenticated = 0;
  clientType : string;
  constructor(private client : HttpClient, private snackBar : MatSnackBar, private router : Router) {
    
    this.loggedin();
   }
  get token() : string{
    return sessionStorage.getItem("token") || "guest";
  }
  public login(email : string, password : string,clientType :  ClientType){
    const path = this.path +"/"+ email +"/"+password+"/"+clientType;
    
    this.client.post(path, null,{responseType:"text"}).subscribe(
      success =>{
        this.snackBar.open("Login successfull",null, {duration : 3000});
        this.authenticated = 2;
        this.clientType = clientType.toString();
        sessionStorage.setItem("token",success);
        this.router.navigateByUrl("/home");
      },
      error=>{
        let errorMessage = error.status == 0 ? "Oops, Please try again later" : error.error;
      
        this.snackBar.open(errorMessage, "dismiss");
      }
    );
  }
  public logout() {
    this.client.post(this.path + "/logout/" + sessionStorage.getItem("token"), null, {responseType:"text"}).subscribe(
      success => {
        this.snackBar.open(success, null, {duration: 3000});
        sessionStorage.setItem("token","null");
        this.authenticated = 1;
        this.clientType = null;
      }, error =>{
        let errorMessage = error.status == 0 ? "Oops, try again later" : error.error;
        this.snackBar.open(errorMessage, "dismiss");
      }
    )
  }
  public loggedin(){
    const token : string = sessionStorage.getItem("token") || "null";
    const path = this.path + "/loggedin/" + token;
    
    this.client.post(path, null).subscribe(
      success => {
        if(typeof success == 'object'){
          if(success.hasOwnProperty('firstName')){
            this.clientType = "Customer";
          }else{
            this.clientType = "Company";
          }
        }else{
          this.clientType = "Administrator";
        }
        console.log(this.clientType.toString())
        this.authenticated = 2;
        
       
      }, 
      error => {
        
        this.authenticated = 1;
        this.router.navigateByUrl("/login");
        
        sessionStorage.setItem("token","guest");
      }
    );
  }
  
}
