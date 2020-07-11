import { Coupon } from './coupon';

export class Company {
    constructor(private id : number,
                private name : string,
                private email : string,
                private password : string,
                private coupons? : Coupon[]
        ){}
    get _id() : number{
        return this.id;
    }
    set _id(id : number){
        this.id = id;
    }
    get _name() : string{
        return this.name;
    }
    set _name(name :string){
        this.name = name;
    }
    get _email() : string{
        return this.email;
    }
    set _email(email : string){
        this.email = email;
    }
    get _password() : string{
        return this.password;
    }
    set _password(password : string) {
        this.password = password;
    }
    get _coupons(): Coupon[]{
        let coupons : Coupon[] = new Array<Coupon>();
        if(this.coupons)
            coupons = this.coupons;
        return coupons;

    }
    public static getCompany(obj : Company) : Company{
        let company : Company = new Company(0,"","","",[]);
        return Object.assign(company,obj);
    }
    public static getCompanies(obj : Company[]) : Company[]{
        let companies : Company[] = new Array<Company>();
        for(let c of obj){
            companies.push(this.getCompany(c));
        }
        return companies;
    }
}
