import { Category } from './category.enum';

export class Coupon {
    private bought : number;
    constructor( private id : number,
                 private companyId : number,
                 private category : Category,
                 private title : string,
                 private description : string,
                 private startDate : Date,
                 private endDate : Date,
                 private originalAmount :  number,
                 private currentAmount : number,
                 private price : number,
                 private image : string
        ){
            this.bought = originalAmount - currentAmount;
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
    get _currentAmount() : number{
        return this.currentAmount;
    }
    set _currentAmount(currentAmount : number){
        this.currentAmount = currentAmount;
    }
    get _bought() : number{
        return this.bought;
    }
    get _price() : number{
        return this.price;
    }
    set _price(price : number){
        this.price = price;
    }
    get _image() : string{
        return this.image;
    }
    set _image(image :string){
        this.image = image;
    }
    public static getCoupon(obj : Coupon){
        let coupon : Coupon = new Coupon(obj.id,obj.companyId,obj.category,obj.title,
                                         obj.description,obj.startDate,obj.endDate,
                                         obj.originalAmount,obj.currentAmount,obj.price,obj.image);

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
