import { Component, OnInit } from '@angular/core';
import { Order } from 'src/models/order';
import { Recipt } from 'src/models/recipt';
import { OrdersService } from 'src/app/services/orders.service';
import { UsersService } from 'src/app/services/users.service';
import { TablesService } from 'src/app/services/tables.service';
import { ActivatedRoute } from '@angular/router';
import { ReciptsService } from 'src/app/services/recipts.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  tableCode:string;
  clients:number;
  barOrders:Array<Order>;
  kitchenOrders:Array<Order>;
  recipt:Recipt;

  constructor(private ordersService:OrdersService,private usersService:UsersService,private tablesService:TablesService,private reciptsService:ReciptsService,private route:ActivatedRoute) { }

  ngOnInit() {

    this.clients=+(this.route.snapshot.paramMap.get('clients'));
    this.tableCode = this.route.snapshot.paramMap.get('tableCode');
    

    this.recipt=new Recipt(this.tableCode,this.clients);

    this.ordersService.getOrders("kitchen",`?tableCode=${this.tableCode}`).subscribe(
      (res)=>this.kitchenOrders=res,
      (err)=>console.log(err),
      ()=>{
          this.kitchenOrders=this.kitchenOrders.filter((order)=>{return order.status!="checked-out"});
          let total:number=0;
          console.log(this.kitchenOrders);
          for (let  order of this.kitchenOrders){
            this.recipt.kitchenItems=this.recipt.kitchenItems.concat(order.items);
            total = order.items.reduce(function(prev, cur) {
              return prev + cur.price;
            }, 0);
          } 

          
          this.recipt.totalKitchen=total;

          this.ordersService.getOrders("bar",`?tableCode=${this.tableCode}`).subscribe(
            (res)=>this.barOrders=res,
            (err)=>console.log(err),
            ()=>{
                this.barOrders=this.barOrders.filter((order)=>{return order.status!="checked-out"});
                let total:number=0;
                for (let  order of this.barOrders){
                  console.log(order.items);
                  this.recipt.barItems=this.recipt.barItems.concat(order.items);
                  total = order.items.reduce(function(prev, cur) {
                    return prev + cur.price;
                  }, 0);
                } 
                this.recipt.totalBar=total;
                this.recipt.total=this.recipt.totalBar+this.recipt.totalKitchen;
               
              }  
          );
          
        }
    );
  }


  checkOut(){

    this.ordersService.checkOut("bar",this.tableCode).subscribe(
      (res)=>console.log(res),
      (err)=>console.log(err),
      ()=>console.log("done")
    );

    this.ordersService.checkOut("kitchen",this.tableCode).subscribe(
      (res)=>console.log(res),
      (err)=>console.log(err),
      ()=>console.log("done")
    );

    this.reciptsService.newRecipt(this.recipt).subscribe(
      (res)=>console.log(res),
      (err)=>console.log(err),
      ()=>console.log("done")
    );

    this.usersService.user.jobs+=1;
    this.usersService.updateUser(this.usersService.user.username).subscribe(
      (res)=>console.log(res),
      (err)=>console.log(err),
      ()=>console.log("done")
    );

    this.tablesService.updateTable(this.tableCode,{clients:0}).subscribe(
      (res)=>console.log(res),
      (err)=>console.log(err),
      ()=>console.log("done")
    )

  }



}
