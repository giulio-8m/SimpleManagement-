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

  messages:Array<any>;

  constructor(private router:Router,private toastr: ToastrService,private socketService:SocketService,private usersService:UsersService,private ordersService:OrdersService) { }

  ngOnInit() {
    this.messages=null;
    this.usersService.userOb.subscribe((user)=>{
      if(this.usersService.user && this.usersService.user.role=="Cameriere"){
        this.getKitchenMessages();
        this.getBarMessages();
        this.socketService.socket.on('updateKitchen',()=>{
          this.getKitchenMessages();
        });
        this.socketService.socket.on('updateBar',()=>{
          this.getBarMessages();
        })
      }
      
    });

    if(this.usersService.user && this.usersService.user.role=="Cameriere"){
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
    this.ordersService.getOrders(`kitchen`,`?waiter=${this.usersService.user.username}&status=completato`).subscribe(
      (res)=>this.messages=res,
      (err)=>console.log(err),
      ()=>{
        for(let i=0;i<this.messages.length;i++){
            this.pop(this.messages[i],"kitchen");

        }
      }
    );
  }

  getBarMessages(){
    this.ordersService.getOrders(`bar`,`?waiter=${this.usersService.user.username}&status=completato`).subscribe(
      (res)=>this.messages=res,
      (err)=>console.log(err),
      ()=>{

        for(let i=0;i<this.messages.length;i++){
            this.pop(this.messages[i],"bar");
        
        }
      }
    );
  }

  pop(order:Order,type:string){
    let orderNumber:number;
    if(type=="kitchen"){
      orderNumber=order.kitchenNumber;
    }else{
      orderNumber=order.barNumber;
    }
    this.toastr.success('Tavolo : '+order.tableCode, 'Ordine '+ orderNumber+ ' '+'da servire',{
      disableTimeOut: true
    }).onTap.subscribe(
      ()=>{
        
          order.status="servito";
          this.ordersService.updateOrder(type,order).subscribe(
            (res)=>{},
            (err)=>console.log(err),
            ()=>{
              if(type=="kitchen"){
                this.socketService.socket.emit('updateKitchen');
              }else if(type=="bar"){
                this.socketService.socket.emit('updateBar');
              }
            }
          );
          this.usersService.user.jobs+=1;
          this.usersService.updateUser(this.usersService.user.username).subscribe(
            (res)=>{},
            (err)=>console.log(err),
            ()=>this.socketService.socket.emit('updateUsers')
          );

          this.router.navigate(['/tables']);
        
        
      }
    );
  }


}
