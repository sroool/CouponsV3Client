import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Admin } from 'src/app/models/admin';
import { AdminService } from 'src/app/services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-addcustomer',
  templateUrl: './addcustomer.component.html',
  styleUrls: ['./addcustomer.component.css']
})
export class AddcustomerComponent implements OnInit {
  visibility = "visibility";
  type = "password";
  title = "Add Customer";
  newCustomer : FormGroup;
  disableDeleteButton = false;
  constructor(private fb: FormBuilder, private adminService : AdminService,
              private snackBar : MatSnackBar, private dialog : MatDialogRef<AddcustomerComponent>,
              @Inject(MAT_DIALOG_DATA)public customer :Customer) { }

  ngOnInit(): void {
    this.newCustomer = this.fb.group({
      id: [{value:"",disabled:true},[]],
      fname : ["",[Validators.required]],
      lname: ["",[Validators.required]],
      email: ["",[Validators.required]],
      password: ["",[Validators.required]],
      confirmp: ["",[Validators.required, this.validatePasswordsMatch]]
    })
    if(this.customer){
      this.newCustomer.setValue({id:this.customer._id,fname:this.customer._firstName,lname:this.customer._lastName,
                                email: this.customer._email, password:this.customer._password,confirmp:this.customer._password});
      this.title = "Update Customer";                          
    }
  }

  validatePasswordsMatch(control : AbstractControl){
    const password : string = control.parent?.get("password").value;
    const confirmPassword : string = control.value;
    if(password != confirmPassword){
      return {passwordMatchError: true};
    }
    
  }
  saveCustomer(){
    if(this.customer){
      this.updateCustomer();
    }else{
      this.addCustomer()
    }
  }
  addCustomer(){
    this.newCustomer.disable();
    const customer : Customer = new Customer(0,this.fname.value,this.lname.value,this.email.value,this.password.value);
    this.adminService.addCustomer(customer).subscribe(
      success =>{
        const snackRef = this.snackBar.open("New Customer added succesfully!", "dismiss");
        snackRef.onAction().subscribe( ()=>{
          this.close();
        })
      }, error =>{
        let errorMessage : string = error.error;
        if(error.status == 0 || error.status == 500){
          errorMessage = "oops, try again later";
        }
        const snackRef = this.snackBar.open(errorMessage, "dismiss");
        snackRef.onAction().subscribe( ()=>{
          this.newCustomer.enable();
        })
      }
    )
  }
  updateCustomer(){
    this.newCustomer.disable();
    this.disableDeleteButton = true;
    const customer : Customer = new Customer(this.id.value,this.fname.value,this.lname.value,this.email.value,this.password.value, this.customer._coupons);
    this.adminService.updateCustomer(customer).subscribe(
      success =>{
        const snackRef = this.snackBar.open("Customer updated succesfully!", "dismiss");
        snackRef.onAction().subscribe( ()=>{
          this.close();
        })
      }, error =>{
        let errorMessage : string = error.error;
        if(error.status == 0 || error.status == 500){
          errorMessage = "oops, try again later";
        }
        const snackRef = this.snackBar.open(errorMessage, "dismiss");
        snackRef.onAction().subscribe( ()=>{
          this.newCustomer.enable();
          this.disableDeleteButton = false;
        })
      }
    )
  }
  deleteCustomer(){
    this.newCustomer.disable();
    this.disableDeleteButton = true;
    this.adminService.deleteCustomer(this.id.value).subscribe(
      success =>{
        const snackRef = this.snackBar.open("Customer deleted succesfully", "dismiss");
        snackRef.onAction().subscribe( ()=>{
          this.close();
        })
      }, error =>{
        let errorMessage : string = error.error;
        if(error.status == 0 || error.status == 500){
          errorMessage = "oops, try again later";
        }
        const snackRef = this.snackBar.open(errorMessage, "dismiss");
        snackRef.onAction().subscribe( ()=>{
          this.newCustomer.enable();
          this.disableDeleteButton = false;
        })
      }
    )
  }
  showPassword(){
    if(this.type == "password"){
      this.type = "text";
      this.visibility = "visibility_off";
    }else{
      this.type = "password";
      this.visibility = "visibility";
    }
  }
  close(){
    this.dialog.close();
  }
  get id(){
    return this.newCustomer.controls['id'];
  }
  get fname(){
    return this.newCustomer.controls['fname'];
  }
  get lname(){
    return this.newCustomer.controls['lname'];
  }
  get email(){
    return this.newCustomer.controls['email'];
  }
  get password(){
    return this.newCustomer.controls['password'];
  }
  get confirmp(){
    return this.newCustomer.controls['confirmp'];
  }
}
