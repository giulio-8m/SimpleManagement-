import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SocketService } from 'src/app/services/socket.service';
import { OrdersService } from 'src/app/services/orders.service';
import { UsersService } from 'src/app/services/users.service';
import { Order } from 'src/models/order';
@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.css']
})
export class ToastsComponent implements OnInit {

  messages:Array<any>;

  constructor(private toastr: ToastrService,private socketService:SocketService,private usersService:UsersService,private ordersService:OrdersService) { }

  ngOnInit() {
    this.messages=null;

    if(this.usersService.user && this.usersService.user.role=="Cameriere"){
      console.log(" tost cameriere");
      this.getKitchenMessages();
      this.getBarMessages();
      this.socketService.socket.on('updateKitchen',()=>{
        this.getKitchenMessages();
      });
      this.socketService.socket.on('updateBar',()=>{
        this.getBarMessages();
      })
    }
  }

  getKitchenMessages(){
    this.ordersService.getOrders(`kitchen`,`?waiter=${this.usersService.user.username}&status=completed`).subscribe(
      (res)=>this.messages=res,
      (err)=>console.log(err),
      ()=>{
        console.log("toaasasstiss");

        for(let i=0;i<this.messages.length;i++){

          if(this.messages[i].status=="completed" ){
            this.pop(this.messages[i],"kitchen");
          }
        }
      }
    );
  }

  getBarMessages(){
    this.ordersService.getOrders(`bar`,`?waiter=${this.usersService.user.username}&status=completed`).subscribe(
      (res)=>this.messages=res,
      (err)=>console.log(err),
      ()=>{
        console.log("toaasasstiss");

        for(let i=0;i<this.messages.length;i++){

          if(this.messages[i].status=="completed" ){
            this.pop(this.messages[i],"bar");
          }
        }
      }
    );
  }

  pop(order:Order,type:string){
    let orderNumber:number;
    if(type=="Kitchen"){
      orderNumber=order.kitchenNumber;
    }else{
      orderNumber=order.barNumber;
    }
    this.toastr.success('Table : '+order.tableCode, 'Order '+ orderNumber+ ' from '+type+' ready',{
      disableTimeOut: true
    }).onTap.subscribe(
      ()=>{
        
          order.status="delivered";
          this.ordersService.updateOrder(type,order).subscribe(
            (res)=>console.log(res),
            (err)=>console.log(err),
            ()=>console.log("done")
          );
        
      }
    );
  }


}
