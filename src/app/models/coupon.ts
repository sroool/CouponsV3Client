import { Category } from './category.enum';

export class Coupon {
  
    constructor( private id : number,
                 private companyId : number,
                 private category : Category,
                 private title : string,
                 private description : string,
                 private startDate : Date,
                 private endDate : Date,
                 private originalAmount :  number,
                 private bought : number,
                 private price : number,
                 private imageUrlData 
        ){
        }

    get _id() : number{
        return this.id;
    }
    set _id(id : number) {
        this.id = id;
    }
    get _category(){
        return this.category;
    }
    set _category(category : Category){
        this.category = category;
    }
    get _companyId() : number{
        return this.companyId;
    }
    set _companyId(companyId : number) {
        this.companyId = companyId;
    }

    get _title() : string{
        return this.title;
    }
    set _title(title : string){
        this.title = title;
    }
    get _description() : string {
        return this.description;
    }
    set _description(description : string){
        this.description = description;
    }
    get _startDate() : Date{
        return this.startDate;
    }
    set _startDate(startDate : Date){
        this.startDate = startDate;
    }
    get _endDate() : Date{
        return this.endDate;
    }
    set _endDate(endDate : Date){
        this.endDate = endDate;
    }
    get _originalAmount() : number{
        return this.originalAmount;
    }
    set _originalAmount(originalAmount : number) {
        this.originalAmount = originalAmount;
    }
   
    get _bought() : number{
        return this.bought;
    }
    set _bought(bought : number){
        this.bought = bought;
    }
    get _price() : number{
        return this.price;
    }
    set _price(price : number){
        this.price = price;
    }
    get _imageUrlData() : string{
        
        return window.atob(this.imageUrlData);
    }
    set _imageUrlData(image :string){
        this.imageUrlData = image;
    }
    public static getCoupon(obj : Coupon){
        let coupon : Coupon = new Coupon(obj.id,obj.companyId,obj.category,obj.title,
                                         obj.description,obj.startDate,obj.endDate,
                                         obj.originalAmount,obj.bought,obj.price,obj.imageUrlData);

        return coupon;
    }
    public static getCoupons(obj : Coupon[]){
        let coupons : Coupon[] = new Array<Coupon>();
        for(let c of obj){
            coupons.push(this.getCoupon(c));
        }
        return coupons;
    }

}
