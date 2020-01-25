import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';
import { Order } from 'src/models/order';
import { OrdersService } from 'src/app/services/orders.service';
import * as $ from 'jquery'
import { MenuItem } from 'src/models/menuItem';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-table-orders',
  templateUrl: './table-orders.component.html',
  styleUrls: ['./table-orders.component.css']
})
export class TableOrdersComponent implements OnInit {
  tableCode:string;
  errorMessage:string;
  kitchenOrders:Array<Order>;
  barOrders:Array<Order>;

  constructor(private socketService:SocketService,private ordersService:OrdersService,private route:ActivatedRoute) { }

  ngOnInit() {
    this.tableCode = this.route.snapshot.paramMap.get('tableCode');
    this.socketService.socket.on('updateKitchen',()=>{
      this.getOrders("kitchen");
    })
    this.socketService.socket.on('updateBar',()=>{
      this.getOrders("bar");
    })
    this.getOrders("kitchen");
    this.getOrders("bar");
  }

  getOrders(where:string){
    this.ordersService.getOrders(where,`?tableCode=${this.tableCode}`).subscribe(
      (res)=>{
        res=res.filter((order)=>{
          if(order.status!="pagato"){
            return true;
          }else
            return false;
        });

        if(where=="kitchen"){
          this.kitchenOrders=res;
        }else{
          this.barOrders=res;
        }
        $(document).ready(()=>{
          for(let i=0;i<res.length;i++){
            this.update(res[i]);
          }
        })

      },
      (err)=>this.errorMessage=err.statusText,
      ()=>{}
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

}
