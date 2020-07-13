import { Coupon } from './coupon';

export class Customer {
    constructor( private id : number,
                 private firstName : string,
                 private lastName : string,
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
    get _firstName() : string {
        return this.firstName;
    }
    set _firstName(firstName : string){
        this.firstName = firstName;
    }
    get _lastName() : string{
        return this.lastName;
    }
    set _lastName(lastName : string){
        this.lastName = lastName;
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
    set _password(password : string){
        this.password = password;
    }
    get _coupons() : Coupon[]{
        let coupons : Coupon[] = new Array<Coupon>();
        if(this.coupons)
            coupons = this.coupons;
        return coupons;
    }
    set _coupons(coupons : Coupon[]){
        this.coupons = coupons;
    }

    public static getCustomer(obj : Customer){
        let customer : Customer = new Customer(obj.id,obj.firstName,obj.lastName,obj.email,obj.password,[]);
        customer._coupons = Coupon.getCoupons(obj.coupons);
        return customer;
    }
    public static getCustomers(obj : Customer[]){
        let customers : Customer[] = new Array<Customer>();
        for(let c of obj){
            customers.push(this.getCustomer(c))
        }
        return customers;
    }
}
