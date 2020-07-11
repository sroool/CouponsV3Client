import { Component, OnInit, ViewChild } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AdminService } from 'src/app/services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddcustomerComponent } from '../addcustomer/addcustomer.component';

@Component({
  selector: 'app-allcustomers',
  templateUrl: './allcustomers.component.html',
  styleUrls: ['./allcustomers.component.css']
})
export class AllcustomersComponent implements OnInit {
  customers : Customer[];
  dataSource ;
  search ;
  displayedColumns : string[] = ["id","firstName","lastName","email","password","coupons","actions"];
  @ViewChild(MatSort) sort : MatSort;
  @ViewChild(MatPaginator) paginator : MatPaginator;
  constructor( private adminService : AdminService,
               private snackBar : MatSnackBar, 
               private dialog : MatDialog) { }

  ngOnInit(): void {
    this.adminService.getAllCustomers().subscribe(
      success =>{
        const customers : Customer[] = Customer.getCustomers(success);
        this.customers = customers;
    
        this.dataSource = new MatTableDataSource(this.customers);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }, error =>{
        let errorMessage : string = error.error;
        if(error.status == 0 || error.status == 500){
          errorMessage = "oops, try again later";
        }
        this.snackBar.open(errorMessage, "dismiss");
      }
    )
  }
  showCustomer(customer){
    let config : MatDialogConfig = new MatDialogConfig();
    config.autoFocus = true;
    config.disableClose = true;
    config.width = "60%";
    config.data = customer;
    const dialogRef = this.dialog.open(AddcustomerComponent,config);
    dialogRef.afterClosed().subscribe( result => {
      this.ngOnInit();
    })
  }
  addCustomer(){
    let config : MatDialogConfig = new MatDialogConfig();
    config.autoFocus = true;
    config.disableClose = true;
    config.width = "60%";
    const dialogRef = this.dialog.open(AddcustomerComponent,config);
    dialogRef.afterClosed().subscribe( result => {
      this.ngOnInit();
    });
  }
  filterSearch(){
    this.dataSource.filter = this.search.trim().toLowerCase();
  }
  clearSearch(){
    this.search = "";
    this.filterSearch();
  }

}
