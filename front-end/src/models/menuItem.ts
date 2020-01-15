export class MenuItem{

    constructor(name:string,type:string,price:number,time:number){
        this.name=name;
        this.type=type;
        this.price=price;
        this.time=time;
        this.amount=0;
        this.status="start";
    }
    amount:number;
    name:string;
    type:string;
    price:number;
    time:number;
    status:string;
}