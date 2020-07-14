import { Component, OnInit, ViewChild } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Coupon } from 'src/app/models/coupon';

@Component({
  selector: 'app-customerprofile',
  templateUrl: './customerprofile.component.html',
  styleUrls: ['./customerprofile.component.css']
})
export class CustomerprofileComponent implements OnInit {
  customer : Customer;
  coupons: Coupon[];
  search : string;
  searchOption = "Regular Search";
  dataSource;
  displayedColumns : string[] = ["image","title","endDate","price"]
  @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatSort) sort : MatSort;
  constructor(private customerService : CustomerService) { }

  ngOnInit(): void {
    this.customerService.getCustomerDetails().subscribe(
      success =>{
        this.customer = Customer.getCustomer(success);
        this.coupons = Coupon.getCoupons(this.customer._coupons);
        this.dataSource = new MatTableDataSource(this.coupons);
        console.log(this.searchOption);
        this.dataSource.filterPredicate = (data, filter) => {
          if(this.searchOption == "By Category"){
            return data._category.toString().toLowerCase().indexOf(filter) != -1;
          }else if(this.searchOption == "By Max Price"){
            return data._price <= +filter;
          }else{
            return this.displayedColumns.some( element =>{
              data[element].toString().toLowerCase().indexOf(filter) != -1
            });
          }
        }
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error =>{
        console.log(error);
      }
    )
  }
    filterSearch(){
      this.dataSource.filter = this.search.trim().toLowerCase();
    }
    clearSearch(){
      this.search = '';
      this.filterSearch();
    }

}
