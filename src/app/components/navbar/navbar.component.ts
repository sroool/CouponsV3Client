import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ClientType } from 'src/app/services/client-type.enum';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddcompanyComponent } from '../addcompany/addcompany.component';
import { AddcustomerComponent } from '../addcustomer/addcustomer.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  constructor(public router : Router, public loginService : LoginService, private dialog : MatDialog) { }

  ngOnInit(): void {
    const t : ClientType = ClientType.Administrator;
    
  }
  createCompany(){
    let config : MatDialogConfig  = new MatDialogConfig();
    config.autoFocus = true;
    config.disableClose = true;
    config.width = "40%";
    this.dialog.open(AddcompanyComponent, config);
  }
  createCustomer(){
    let config : MatDialogConfig  = new MatDialogConfig();
    config.autoFocus = true;
    config.disableClose = true;
    config.width = "40%";
    this.dialog.open(AddcustomerComponent, config);
  }

}
