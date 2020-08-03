import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from 'src/app/models/company';
import { Coupon } from 'src/app/models/coupon';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { AddcouponComponent } from '../addcoupon/addcoupon.component';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-companyprofile',
  templateUrl: './companyprofile.component.html',
  styleUrls: ['./companyprofile.component.css']
})
export class CompanyprofileComponent implements OnInit {
  company: Company;
  coupons: Coupon[];
  clients: Customer[];
  search: string;
  searchOption = "Regular Search";
  dataSource;
  displayedColumns: string[] = ["image", "title", "category", "endDate", "originalAmount", "bought", "price", "actions"]
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private router : Router,private companyService: CompanyService, private dialog: MatDialog, private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.companyService.getCompanyDetails().subscribe(
      success => {
        this.company = Company.getCompany(success);
        this.coupons = Coupon.getCoupons(this.company._coupons);
        this.dataSource = new MatTableDataSource(this.coupons);
        this.dataSource.filterPredicate = (data, filter) => {
          if (this.searchOption == "By Category") {
            return data._category.toString().toLowerCase().indexOf(filter) != -1;
          } else if (this.searchOption == "By Max Price") {
            return data._price <= +filter;
          } else {
            return this.displayedColumns.some(element => {
              return (element != "image" && element != "actions") && (data[element].toString().toLowerCase().indexOf(filter) != -1);
            });
          }
        }
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.companyService.getAllClients().subscribe(
          success => {
            this.clients = Customer.getCustomers(success);

          },
          error => {
            let errorMessage: string = error.error;
            if (error.status == 0 || error.status == 500) {
              errorMessage = "Oops, try again later";
            }
            const snackRef = this.snackBar.open(errorMessage, "dismiss");

          }
        )
      },
      error => {
        if(error.status == 401){
          this.router.navigateByUrl('/home')
        }
        let errorMessage: string = error.error;
        if (error.status == 0 || error.status == 500) {
          errorMessage = "Oops, try again later";
        }
        const snackRef = this.snackBar.open(errorMessage, "dismiss");
      }
    )
  }
  createCoupon() {
    let config: MatDialogConfig = new MatDialogConfig();
    config.autoFocus = true;
    config.disableClose = true;
    config.width = "60%";
    const dialogRef = this.dialog.open(AddcouponComponent, config);
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }
  editCoupon(coupon) {
    let config: MatDialogConfig = new MatDialogConfig();
    config.autoFocus = true;
    config.disableClose = true;
    config.width = "60%";
    config.data = coupon;
    const dialogRef = this.dialog.open(AddcouponComponent, config);
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }
  filterSearch() {
    this.dataSource.filter = this.search.trim().toLowerCase();
  }
  clearSearch() {
    this.search = '';
    this.filterSearch();
  }
  getAmountPurchases(coupon: Coupon) {

    return this.clients?.filter(client => client._coupons.some(c => c._id == coupon._id)).length;
  }
}
