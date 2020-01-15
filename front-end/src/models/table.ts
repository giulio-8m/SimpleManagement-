export class Table {

    constructor(tableCode:string,seats:number){
       this.seats=new Array();
       for(let i=1;i<=seats;i++){
           this.seats.push(i);
       }
       this.tableCode=tableCode;
       this.clients=0;
    }
 
    tableCode:string;
    clients:number;
    seats:Array<Number>;
 }