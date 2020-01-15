import { MenuItem } from './menuItem';

export class Recipt{

    constructor(tableCode:string,clients:number){
        this._id=null;
        let dateS=new Date();
        this.date=dateS.getDate()+'/'+dateS.getMonth()+'/'+dateS.getFullYear();
        this.tableCode=tableCode;
        this.clients=clients;
        this.barItems=new Array();
        this.kitchenItems=new Array();
        this.totalBar=0;
        this.totalKitchen=0;
        this.total=0;
    }
    _id:string;
    date:string;
    tableCode:string;
    clients:number;
    kitchenItems:Array<MenuItem>;
    barItems:Array<MenuItem>;
    totalBar:number;
    totalKitchen:number;
    total:number;

}