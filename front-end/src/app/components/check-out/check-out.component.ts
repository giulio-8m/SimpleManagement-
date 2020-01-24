import { Component, OnInit } from '@angular/core';
import { Order } from 'src/models/order';
import { Recipt } from 'src/models/recipt';
import { OrdersService } from 'src/app/services/orders.service';
import { UsersService } from 'src/app/services/users.service';
import { TablesService } from 'src/app/services/tables.service';
import { ActivatedRoute } from '@angular/router';
import { ReciptsService } from 'src/app/services/recipts.service';
import { SocketService } from 'src/app/services/socket.service';
import {Location} from '@angular/common'

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  errorMessage:string;
  tableCode:string;
  clients:number;
  barOrders:Array<Order>;
  kitchenOrders:Array<Order>;
  recipt:Recipt;

  constructor(private location:Location,private socketService:SocketService,private ordersService:OrdersService,private usersService:UsersService,private tablesService:TablesService,private reciptsService:ReciptsService,private route:ActivatedRoute) { }

  ngOnInit() {

    this.clients=+(this.route.snapshot.paramMap.get('clients'));
    this.tableCode = this.route.snapshot.paramMap.get('tableCode');
    
    this.socketService.socket.on(`updateKitchen`,()=>{
      this.getOrders();
    })

    this.socketService.socket.on(`upateBar`,()=>{
      this.getOrders();
    })

    this.getOrders();

    
  }

  getKitchen(){
    this.ordersService.getOrders("kitchen",`?tableCode=${this.tableCode}`).subscribe(
      (res)=>this.kitchenOrders=res,
      (err)=>this.errorMessage=err.statusText,
      ()=>{
          this.kitchenOrders=this.kitchenOrders.filter((order)=>{return order.status!="pagato"});
          let totalK:number=0;
          for (let  order of this.kitchenOrders){
            this.recipt.kitchenItems=this.recipt.kitchenItems.concat(order.items);
            totalK = order.items.reduce(function(prev, cur) {
              return prev + (cur.price*cur.amount);
            }, 0);
          }

          this.recipt.totalKitchen=totalK;
          this.getBar();

      });
  }

  getBar(){

    this.ordersService.getOrders("bar",`?tableCode=${this.tableCode}`).subscribe(
      (res)=>this.barOrders=res,
      (err)=>this.errorMessage=err.statusText,
      ()=>{
          this.barOrders=this.barOrders.filter((order)=>{return order.status!="pagato"});
          let totalB:number=0;
          for (let  order of this.barOrders){
            this.recipt.barItems=this.recipt.barItems.concat(order.items);
            totalB = order.items.reduce(function(prev, cur) {
              return prev + (cur.price*cur.amount);
            }, 0);
          } 
          this.recipt.totalBar=totalB;
          this.recipt.total=this.recipt.totalBar+this.recipt.totalKitchen;
         
        }  
    );

  }

  getOrders(){
    this.recipt=new Recipt(this.tableCode,this.clients);
    this.getKitchen();

  }



  checkOut(){

    this.ordersService.checkOut("bar",this.tableCode).subscribe(
      (res)=>console.log(res),
      (err)=>this.errorMessage=err.statusText,
      ()=>this.socketService.socket.emit('updateBar')
    );

    this.ordersService.checkOut("kitchen",this.tableCode).subscribe(
      (res)=>console.log(res),
      (err)=>this.errorMessage=err.statusText,
      ()=>this.socketService.socket.emit('updateKitchen')
    );

    this.reciptsService.newRecipt(this.recipt).subscribe(
      (res)=>console.log(res),
      (err)=>this.errorMessage=err.statusText,
      ()=>this.socketService.socket.emit('updateRecipts')
    );

    this.usersService.user.jobs+=1;
    this.usersService.updateUser(this.usersService.user.username).subscribe(
      (res)=>console.log(res),
      (err)=>this.errorMessage=err.statusText,
      ()=>this.socketService.socket.emit('updateUsers')
    );

    this.tablesService.updateTable(this.tableCode,{clients:0}).subscribe(
      (res)=>console.log(res),
      (err)=>this.errorMessage=err.statusText,
      ()=>{this.socketService.socket.emit('updateTables')
      this.location.back();
    }
    )

    

  }

  goBack(){
    this.location.back();
  }



}
