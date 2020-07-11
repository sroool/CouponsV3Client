import { Component, OnInit, ViewChild } from '@angular/core';
import { Company } from 'src/app/models/company';
import { AdminService } from 'src/app/services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddcompanyComponent } from '../addcompany/addcompany.component';

@Component({
  selector: 'app-allcompanies',
  templateUrl: './allcompanies.component.html',
  styleUrls: ['./allcompanies.component.css']
})
export class AllcompaniesComponent implements OnInit {

  companies : Company[];
  dataSource;
  search;
  displayedColumns : string[] = ["id", "name", "email", "password", "coupons","actions"];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator : MatPaginator;
  constructor(private adminService : AdminService, private snackBar:MatSnackBar, private dialog : MatDialog) { }

  ngOnInit(): void {
    this.adminService.getAllCompanies().subscribe(
      success => {
        const companies : Company[] = Company.getCompanies(success);
        this.companies = companies;
        console.log(this.companies);
        this.dataSource = new MatTableDataSource(this.companies);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }, error => {
        let errorMessage : string = error.error;
        if(error.status == 0){
          errorMessage = "oops, try again later";
        }
        this.snackBar.open(errorMessage,"dismiss");
      }
    )
  }
  showCompany(company){
    let config : MatDialogConfig = new MatDialogConfig();
    config.autoFocus = true;
    config.disableClose = true;
    config.width = "60%";
    config.data = company;
    const dialogRef = this.dialog.open(AddcompanyComponent,config);
    dialogRef.afterClosed().subscribe( result =>{
      this.ngOnInit();
    })
    
  }
  addCompany(){
    let config: MatDialogConfig = new MatDialogConfig();
    config.autoFocus = true;
    config.disableClose = true;
    config.width = "60%";
    const dialogRef = this.dialog.open(AddcompanyComponent,config);
    dialogRef.afterClosed().subscribe( result =>{
      this.ngOnInit();
    })
  }
  filterSearch(){
    this.dataSource.filter = this.search.trim().toLowerCase();
  }
  clearSearch(){
    this.search = "";
    this.filterSearch();
  }


}
