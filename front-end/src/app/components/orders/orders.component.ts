import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { UsersService } from 'src/app/services/users.service';
import { Order } from 'src/models/order';
import { MenuItem } from 'src/models/menuItem';
import * as $ from 'jquery'
import { Location } from '@angular/common'
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  errorMessage:string;
  where:string;
  orders:Array<Order>;

  constructor(private location:Location,private ordersService:OrdersService,private usersService:UsersService,private socketService:SocketService) { }

  ngOnInit() {
    if(location.pathname.includes("kitchen")){
      this.socketService.socket.on('updateKitchen',()=>{
        this.getOrders();
      })
      this.where="kitchen";
    }else if(location.pathname.includes("bar")){
      this.socketService.socket.on('updateBar',()=>{
        this.getOrders();
      })
      this.where="bar";
    }else{
      console.log("error");
    }

    this.socketService.socket.on('updateKitchen',()=>{
      this.getOrders();
    })

   this.getOrders();

  }

  getOrders(){
    this.ordersService.getOrders(this.where,"?status=in_corso").subscribe(
      (res)=>this.orders=res,
      (err)=>this.errorMessage=err.statusText,
      ()=>{
        $(document).ready(()=>{
          for(let i=0;i<this.orders.length;i++){
            this.update(this.orders[i]);
          }
        })
        }
    );
  }


  update(order:Order){
    let progressBar:string='#'+order._id;
      $(progressBar).find(".progress").each(function() {

        let value=order.progress;
        let left = $(this).find('.progress-left .progress-bar');
        let right = $(this).find('.progress-right .progress-bar');
    
          if (value <= 50) {
            right.css('transform', 'rotate(' + (value / 100 * 360) + 'deg)')
          } else {
            right.css('transform', 'rotate(180deg)')
            left.css('transform', 'rotate(' + ((value-50) / 100 * 360) + 'deg)')
          }
        });
  }

  statusCheck(item:MenuItem){
    if(item.status=="da_iniziare"){
      return 1;
    }else if(item.status=="in_preparazione"){
      return 2;
    }
    else{
      return 3;
    }
  }

  start(dish:MenuItem,order:Order){
    dish.status="in_preparazione";
    this.ordersService.updateOrder(this.where,order).subscribe(
      (res)=>{},
      (err)=>this.errorMessage=err.statusText,
      ()=>{

        if(this.where=="kitchen"){
          this.socketService.socket.emit('updateKitchen');
        }else if(this.where=="bar"){
          this.socketService.socket.emit('updateBar');
        }else{
          this.socketService.socket.emit('updateOrders');
        }
        
      }
    );
    
  }

  finish(dish:MenuItem,order:Order){

    dish.status="pronto";
    let prop:number=100/order.items.length;
    order.progress+=prop;
    this.update(order);
    this.usersService.user.jobs+=1;
    this.usersService.updateUser(this.usersService.user.username).subscribe(
      (res)=>{},
      (err)=>this.errorMessage=err.statusText,
      ()=>{this.socketService.socket.emit('updateUsers')}
    );

    if(order.progress>99.98){
      order.status="completato";
    }
    this.ordersService.updateOrder(this.where,order).subscribe(
      (res)=>{},
      (err)=>this.errorMessage=err.statusText,
      ()=>{
        if(this.where=="kitchen"){
          this.socketService.socket.emit('updateKitchen');
        }else if(this.where=="bar"){
          this.socketService.socket.emit('updateBar');
        }else{
          this.socketService.socket.emit('updateOrders');
        }
       }
    );

  }


}
