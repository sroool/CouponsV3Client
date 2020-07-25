import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from '../models/company';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  // "http://localhost:8080"
  path = "http://localhost:8080/admin"
  constructor(private client : HttpClient, private loginService : LoginService) { }
  public addCompany( company : Company){
    const path : string = this.path + "/add-company/" + this.loginService.token;
    return this.client.post(path, company);
  }
  public updateCompany( company : Company){
    const path : string = this.path + "/update-company/" + this.loginService.token;
    return this.client.post(path, company);
  }
  public deleteCompany( id: number ){
    let path : string = this.path + "/delete-company/" + this.loginService.token;
    path += "/"+id;
    return this.client.delete(path,{responseType:"text"});
  }

  public getAllCompanies() : Observable<Company[]>{
    const path : string = this.path + "/get-all-companies/" + this.loginService.token;
    return this.client.get<Company[]>(path);
  }
  public addCustomer( customer : Customer){
    const path : string = this.path + "/add-customer/" + this.loginService.token;
    return this.client.post(path, customer);
  }
  public updateCustomer( customer : Customer){
    const path : string = this.path + "/update-customer/" + this.loginService.token;
    return this.client.post(path, customer);
  }
  public deleteCustomer( id: number ){
    let path : string = this.path + "/delete-customer/" + this.loginService.token;
    path += "/"+id;
    return this.client.delete(path,{responseType:"text"});
  }

  public getAllCustomers() : Observable<Customer[]>{
    const path : string = this.path + "/get-all-customers/" + this.loginService.token;
    return this.client.get<Customer[]>(path);
  }
}
