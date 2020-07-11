import { Category } from './category.enum';

export class Coupon {
    constructor( private _id : number,
                 private _companyId : number,
                 private _category : Category,
                 private _title : string,
                 private _description : string,
                 private _startDate : Date,
                 private _endDate : Date,
                 private _amount :  number,
                 private _price : number,
                 private _image : string
        ){}
    get id() : number{
        return this._id;
    }
    set id(id : number) {
        this._id = id;
    }

    get companyId() : number{
        return this._companyId;
    }
    set companyId(companyId : number) {
        this._companyId = companyId;
    }

    get title() : string{
        return this._title;
    }
    set title(title : string){
        this._title = title;
    }
    get description() : string {
        return this._description;
    }
    set description(description : string){
        this._description = description;
    }
    get startDate() : Date{
        return this._startDate;
    }
    set startDate(startDate : Date){
        this._startDate = startDate;
    }
    get endDate() : Date{
        return this._endDate;
    }
    set endDate(endDate : Date){
        this.endDate = endDate;
    }
    get amount() : number{
        return this._amount;
    }
    set amount(amount : number) {
        this._amount = amount;
    }
    get price() : number{
        return this._price;
    }
    set price(price : number){
        this._price = price;
    }
    get image() : string{
        return this._image;
    }
    set image(image :string){
        this._image = image;
    }
    public static getCoupon(obj : Coupon){
        let coupon : Coupon = new Coupon(0,0,null,"","",null,null,0,0,"");
        return Object.assign(coupon, obj);
    }

}
