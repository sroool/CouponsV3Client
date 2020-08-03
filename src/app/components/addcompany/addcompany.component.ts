import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Company } from 'src/app/models/company';
import { AdminService } from 'src/app/services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-addcompany',
  templateUrl: './addcompany.component.html',
  styleUrls: ['./addcompany.component.css']
})
export class AddcompanyComponent implements OnInit {
  visibility = "visibility";
  type = "password";
  title = "Add Company";
  disableDeleteButton = false;
  newCompany : FormGroup;
  constructor(private fb : FormBuilder, private adminService : AdminService, 
              private snackBar : MatSnackBar, private dialog : MatDialogRef<AddcompanyComponent>,
              @Inject(MAT_DIALOG_DATA) public company : Company) { }

  ngOnInit(): void {
    this.newCompany = this.fb.group({
      id: [{value:"",disabled:true},[]],
      name: ["",[Validators.required]],
      email: ["", [Validators.required,Validators.email]],
      password: ["", [Validators.required]],
      confirmp : ["",[Validators.required, this.validatePasswordsMatch]]
    });
    if(this.company){
      this.newCompany.setValue({id : this.company._id,name: this.company._name, email: this.company._email,
                                password: this.company._password,confirmp:this.company._password});
      this.name.disable();
      this.title = "Update Company";
    }
  }
  saveCompany(){
    if(this.newCompany.invalid){
      this.snackBar.open("Please fill in the form correctly","dismiss",{duration:2000});
      return;
    }
    if(this.company){
      this.updateCompany();
    }else{
      this.addCompany()
    }
  }
  deleteCompany(){
    if(this.newCompany.invalid){
      this.snackBar.open("Please fill in the form correctly","dismiss",{duration:2000});
      return;
    }
    this.newCompany.disable();
    this.disableDeleteButton=true;
    this.adminService.deleteCompany(this.id.value).subscribe(
      success => {
        const snackRef = this.snackBar.open("Company Deleted Successfuly!","dismiss");
        snackRef.onAction().subscribe( ()=>{
          this.close();
        })
      },
      error => {
        let errorMessage : string = error.error;
        if(error.status == 0){
          errorMessage = "oops, try again later", "dismiss";
        }
        const snackRef = this.snackBar.open(errorMessage, "dismiss");
        this.newCompany.enable()
        this.disableDeleteButton = false;
      }
    )
  }
  addCompany(){
    this.newCompany.disable();
    const company : Company = new Company(0,this.name.value,this.email.value,this.password.value) ;
    this.adminService.addCompany(company).subscribe(
      success =>{
        const snackRef = this.snackBar.open("New Company Succesfully added!","dismiss");
        snackRef.onAction().subscribe( ()=>{
          this.close();
        })
      }, error => {
        let errorMessage : string = error.error;
        if(error.status == 0){
          errorMessage = "oops, try again later", "dismiss";
        }
        const snackRef = this.snackBar.open(errorMessage, "dismiss");
        snackRef.onAction().subscribe( ()=>{
          this.newCompany.enable()
        })

      }
    )
  }
  updateCompany(){
    this.newCompany.disable();
    this.disableDeleteButton = true;
    const company : Company = new Company(this.id.value,this.name.value,this.email.value,this.password.value,this.company._coupons) ;
    this.adminService.updateCompany(company).subscribe(
      success =>{
        const snackRef = this.snackBar.open("Company Succesfully Updated!","dismiss");
        snackRef.onAction().subscribe( ()=>{
          this.close();
        })
      }, error => {
        let errorMessage : string = error.error;
        if(error.status == 0){
          errorMessage = "oops, try again later", "dismiss";
        }
        const snackRef = this.snackBar.open(errorMessage, "dismiss");
        snackRef.onAction().subscribe( ()=>{

          this.newCompany.enable()
          this.disableDeleteButton=false;
        })

      }
    )

  }

  close(){
    this.dialog.close();
  }
  validatePasswordsMatch(control : AbstractControl){
    
    const password : string = control.parent?.get("password").value;
    const confirmPassword : string = control.value;
    if(password != confirmPassword){
      return {passwordsMatchError : true}
    }
  }
  showPassword(){
    if(this.type == "password"){
      this.type = "text";
      this.visibility = "visibility_off"
    }else{
      this.type = "password";
      this.visibility = "visibility";
    }
  }
  get id(){
    return this.newCompany.controls['id'];
  }
  get name(){
    return this.newCompany.controls['name'];
  }
  get email(){
    return this.newCompany.controls['email'];
  }
  get password(){
    return this.newCompany.controls['password'];
  }
  get confirmp(){
    return this.newCompany.controls['confirmp'];
  }
}
