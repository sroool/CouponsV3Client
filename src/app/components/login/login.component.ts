import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientType } from 'src/app/services/client-type.enum';
import { LoginService } from 'src/app/services/login.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup;
  clientTypes = Object.keys(ClientType).filter( prop => isNaN(+prop));
  visibility : string= "visibility";
  type : string = "password";
  constructor(private fb : FormBuilder, private loginService : LoginService, 
              private snackBar : MatSnackBar, private router : Router) { }

  ngOnInit(): void {
    
    this.loginForm = this.fb.group({
      email : ["",[Validators.required,Validators.email]],
      password : ["",[Validators.required]],
      clientType: ["", [Validators.required]]
    });

  }
  public login(){
    this.loginService.login(this.email.value, this.password.value, this.clientType.value);
  }
  public showPassword(){
    if(this.type == "password"){
      this.type = "text";
      this.visibility = "visibility_off";
    }else{
      this.type = "password";
      this.visibility = "visibility";
    }
  }
  get email(){
    return this.loginForm.controls['email'];
  }
  get password(){
    return this.loginForm.controls['password'];
  }
  get clientType(){
    return this.loginForm.controls['clientType'];
  }

}
