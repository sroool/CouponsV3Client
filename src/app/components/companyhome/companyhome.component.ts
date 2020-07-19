import { MatSnackBar } from '@angular/material/snack-bar';
import { CompanyService } from 'src/app/services/company.service';
import { CustomerService } from 'src/app/services/customer.service';
import { Company } from './../../models/company';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-companyhome',
  templateUrl: './companyhome.component.html',
  styleUrls: ['./companyhome.component.css']
})
export class CompanyhomeComponent implements OnInit {
  company : Company;
  constructor(private companyService : CompanyService, private snackBar : MatSnackBar) { }

  ngOnInit(): void {
    this.companyService.getCompanyDetails().subscribe(
      success =>{
        this.company = Company.getCompany(success);
      },
      error => {
          let errorMessage = error.error;
          if(error.status == 0 || error.status == 500){
            errorMessage = "Oops, something went wrong";
          }
          this.snackBar.open(errorMessage,null,{duration: 2000});
        
      }
    )
  }

}
