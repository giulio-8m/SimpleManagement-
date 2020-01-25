import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'src/models/menuItem';
import { MenuService } from 'src/app/services/menu.service';
import { Order } from 'src/models/order';
import { UsersService } from 'src/app/services/users.service';
import { OrdersService } from 'src/app/services/orders.service';
import { Location } from '@angular/common'
import { SocketService } from 'src/app/services/socket.service';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  errorMessage:string;
  clients:number;
  tableCode:string;

  firstDishes:Array<MenuItem>;
  secondDishes:Array<MenuItem>;
  drinks:Array<MenuItem>;

  constructor(private location:Location,private socketService:SocketService,private route:ActivatedRoute,private menuService:MenuService,private usersService:UsersService,private ordersService:OrdersService) { }

  ngOnInit() {
    this.clients=+(this.route.snapshot.paramMap.get('clients'));
    this.tableCode = this.route.snapshot.paramMap.get('tableCode');

    this.menuService.getMenu('?type=first-dish').subscribe(
      (res)=>{this.firstDishes=res},
      (err)=>this.errorMessage=err.statusText,
      ()=>{},
    );
    this.menuService.getMenu('?type=second-dish').subscribe(
      (res)=>{this.secondDishes=res},
      (err)=>this.errorMessage=err.statusText,
      ()=>{},
    );
    this.menuService.getMenu('?type=drink').subscribe(
      (res)=>{this.drinks=res;
        },
      (err)=>this.errorMessage=err.statusText,
      ()=>{},
    );
  
  }

  add(item:MenuItem){
    if(item.amount){
      item.amount+=1;
    }else{
      item.amount=0;
      item.amount+=1;
    }
     
  }

  remove(item:MenuItem){
    if(item.amount>0) 
      item.amount-=1;
  }


  itemSort(a:MenuItem,b:MenuItem){
    if(a.time>b.time){    
      return -1;
    }
    else if(a.time==b.time){
      return 0;
    }
    else{
      return 1;
    }
  }

  sendOrder(){

    let kitchenItems=this.firstDishes.concat(this.secondDishes).filter((item)=>{return item.amount>0});
    kitchenItems.map((item)=>{
      item.status="da_iniziare";
    })
    kitchenItems.sort(this.itemSort);

    let barItems=this.drinks.filter((item)=>{ return item.amount>0});
    barItems.map((item)=>{
      item.status="da_iniziare";
    });
    barItems.sort(this.itemSort);

    if(kitchenItems.length>0){
      let kitchenOrder=new Order(this.tableCode,this.usersService.user.username,this.clients,kitchenItems);
      this.ordersService.sendOrder("kitchen",kitchenOrder).subscribe(
        (res)=>{},
        (err)=>this.errorMessage=err.statusText,
        ()=>this.socketService.socket.emit('updateKitchen')
      );
    }

    if(barItems.length>0){
      let barOrder=new Order(this.tableCode,this.usersService.user.username,this.clients,barItems);
      this.ordersService.sendOrder("bar",barOrder).subscribe(
        (res)=>{},
        (err)=>this.errorMessage=err.statusText,
        ()=>this.socketService.socket.emit('updateBar')
      );
    }

    

    this.location.back();

  }


  goBack(){
    this.location.back();
  }





}
