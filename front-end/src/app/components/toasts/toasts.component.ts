import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SocketService } from 'src/app/services/socket.service';
import { OrdersService } from 'src/app/services/orders.service';
import { UsersService } from 'src/app/services/users.service';
import { Order } from 'src/models/order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.css']
})
export class ToastsComponent implements OnInit {

  barMessages:Array<Order>;
  kitchenMessages:Array<Order>

  constructor(private router:Router,private toastr: ToastrService,private socketService:SocketService,private usersService:UsersService,private ordersService:OrdersService) { }

  ngOnInit() {
    this.usersService.userOb.subscribe((user)=>{
        if(this.usersService.user && this.usersService.user.role=="Cameriere"){

          this.getBarMessages();
          this.socketService.socket.on('updateBarMessages',()=>{
            this.getBarMessages();
          })
          
        }
        if(this.usersService.user && this.usersService.user.role=="Cameriere"){
          this.getKitchenMessages();
          this.socketService.socket.on('updateKitchenMessages',()=>{
            this.getKitchenMessages();
          });
          
        }
    });

  }

  getKitchenMessages(){
    this.ordersService.getOrders(`kitchen`,`?waiter=${this.usersService.user.username}&status=completato`).subscribe(
      (res)=>this.kitchenMessages=res,
      (err)=>console.log(err),
      ()=>{
        for(let i=0;i<this.kitchenMessages.length;i++){
            this.popKitchen(this.kitchenMessages[i]);
        }
      }
    );
  }

  getBarMessages(){
    this.ordersService.getOrders(`bar`,`?waiter=${this.usersService.user.username}&status=completato`).subscribe(
      (res)=>this.barMessages=res,
      (err)=>console.log(err),
      ()=>{
        for(let i=0;i<this.barMessages.length;i++){
            this.popBar(this.barMessages[i]);
        
        }
      }
    );
  }


  popKitchen(order:Order){
    this.toastr.success('Tavolo : '+order.tableCode, 'Ordine cucina'+' '+ order.kitchenNumber+ ' '+'da servire',{
      disableTimeOut: true
    }).onTap.subscribe(
      ()=>{
        for(let i=0;i<this.kitchenMessages.length && this.usersService.user.role=="Cameriere";i++){
          if(order._id==this.kitchenMessages[i]._id){
            order.status="servito";
            this.ordersService.updateOrder('kitchen',order).subscribe(
              (res)=>{},
              (err)=>console.log(err),
              ()=>{
                this.socketService.socket.emit('updateKitchen');
                this.router.navigate(['/tables']);
              }
            );
            this.usersService.user.jobs+=1;
            this.usersService.updateUser(this.usersService.user.username).subscribe(
              (res)=>{},
              (err)=>console.log(err),
              ()=>this.socketService.socket.emit('updateUsers')
            );
          }
        }  
     }
    );
  }

  popBar(order:Order){
    this.toastr.success('Tavolo : '+order.tableCode, 'Ordine bar'+' '+ order.barNumber+ ' '+'da servire',{
      disableTimeOut: true
    }).onTap.subscribe(
      ()=>{
        for(let i=0;i<this.barMessages.length && this.usersService.user.role=="Cameriere";i++){
          if(order._id==this.barMessages[i]._id){
            order.status="servito";
            this.ordersService.updateOrder('bar',order).subscribe(
              (res)=>{},
              (err)=>console.log(err),
              ()=>{
                this.socketService.socket.emit('updateBar');
                this.router.navigate(['/tables']);
              }
            );
            this.usersService.user.jobs+=1;
            this.usersService.updateUser(this.usersService.user.username).subscribe(
              (res)=>{},
              (err)=>console.log(err),
              ()=>this.socketService.socket.emit('updateUsers')
            );
          }
        }  
     }
    );
  }


}
