import { MenuItem } from './menuItem';

export class Order{

    constructor(tableCode:string,waiter:string,clients:number,items:Array<MenuItem>){
        this._id=null;
        this.tableCode=tableCode;
        this.waiter=waiter;
        this.clients=clients;
        this.status="ongoing";
        this.progress=0;
        this.kitchenNumber=null;
        this.barNumber=null;
        this.items=items;
        let d=new Date();
        this.date=d.getDate()+'/'+d.getMonth()+'/'+d.getFullYear();
    }

    _id:string;
    tableCode:string;
    waiter:string;
    clients:number;
    status:string;
    progress:number;
    kitchenNumber:number;
    barNumber:number;
    items:Array<MenuItem>;
    date:string;

}