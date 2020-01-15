import { Component, OnInit } from '@angular/core';
import { Order } from 'src/models/order';
import { Recipt } from 'src/models/recipt';
import {Chart} from 'chart.js'
import { ReciptsService } from 'src/app/services/recipts.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  ordersKitchen:Array<Order>;
  ordersBar:Array<Order>;
  recipts:Array<Recipt>;
  stats=[];
  statsRecipts=[];
  chartOrders;
  chartRecipts;
  date:string;
  constructor(private reciptsService:ReciptsService,private ordersService:OrdersService) { }

  ngOnInit() {

    let dateS=new Date();
    this.date=dateS.getDate()+'/'+dateS.getMonth()+'/'+dateS.getFullYear();
    this.stats=[0,0];
    console.log("staats",this.stats);
    this.initChartOrders();
    this.initChartRecipts();

    this.getKitchenOrders(this.date);
    this.getBarOrders(this.date);
    this.getRecipts(this.date);
     /* this.socketService.socket.on('update_kitchenOrders',()=>{
        this.getKitchenOrders(this.date);
      })

      this.socketService.socket.on('update_barOrders',()=>{
        this.getBarOrders(this.date);
      })*/

  }

  getKitchenOrders(date:string){
    this.ordersService.getOrders("kitchen",'?date='+date).subscribe(
      (res)=>this.ordersKitchen=res,
      (err)=>console.log(err),
      ()=>{
        this.stats[0]=this.ordersKitchen.length;
        console.log(this.ordersKitchen)
        console.log("done");
        console.log(this.stats);
        this.chartOrders.update();
        this.chartRecipts.update();
      }
    );
  }

  getBarOrders(date:string){
    this.ordersService.getOrders("bar",'?date='+date).subscribe(
      (res)=>this.ordersBar=res,
      (err)=>console.log(err),
      ()=>{
        console.log(this.ordersBar)
        this.stats[1]=this.ordersBar.length;
        console.log("done");
        console.log(this.stats);
        this.chartOrders.update();
        this.chartRecipts.update();

      }
    );
  }


  getRecipts(date:string){

    this.reciptsService.getRecipts("?").subscribe(
      (res)=>this.recipts=res,
      (err)=>console.log(err),
      ()=>{
        console.log("wqwqq");
        console.log(this.recipts);
        this.statsRecipts=[0,0];
        for(let i=0;i<this.recipts.length;i++){
          this.statsRecipts[0]+=this.recipts[i].totalKitchen;
          this.statsRecipts[1]+=this.recipts[i].totalBar;
        }
        this.chartOrders.update();
        this.chartRecipts.update();
      }
    )
  }


  
  initChartOrders(){
  
    this.chartOrders = new Chart(<HTMLCanvasElement>document.getElementById("statsOrders"), {
    type: 'doughnut',
    data: {
      labels: ["Cucina", "Bar"],
      datasets:[
        {
          backgroundColor: ["#ffcc00", "#3e95cd"],
          data: this.stats
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Quantità ordini',
        fontSize:35
      },
      scales:{
        scaleLabel:{
          fontSize:50
        }
      } 
    }
  });
}


initChartRecipts(){
  
  this.chartRecipts = new Chart(<HTMLCanvasElement>document.getElementById("statsRecipts"), {
  type: 'doughnut',
  data: {
    labels: ["Euro cucina", "Euro bar"],
    datasets:[
      {
        backgroundColor: ["#ffcc00", "#3e95cd"],
        data: this.statsRecipts
      }
    ]
  },
  options: {
    title: {
      display: true,
      text: 'Guadagni',
      fontSize:35
    },
    scales:{
      scaleLabel:{
        fontSize:50
      }
    } 
  }
});
}


}
