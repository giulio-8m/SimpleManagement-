import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/models/user';
import {Chart} from 'chart.js';


@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {

  users:Array<User>;
  waiters:Array<User>;
  chefs:Array<User>;
  barMans:Array<User>;
  desks:Array<User>;

  totalServices:number;

  totalDrinks:number;

  totalDishes:number; 
  totalCashed:number;

  chart:any;
  stats=[];


  constructor(private usersService:UsersService) { }

  ngOnInit() {
    this.getWaiters();
    this.getBarMans();
    this.getChefs();
    this.getDesks();

    /*
    this.socketService.socket.on('update_users',()=>{
      this.totalServices=0;
      this.totalDishes=0;
      this.totalDrinks=0;
      this.totalCashed=0;
      this.getWaiters();
      this.getBarMans();
      this.getChefs();
      this.getDesks();
    });*/
    
  }

  getWaiters(){
    this.usersService.getUsers('?role=Cameriere').subscribe(
      (res)=>this.waiters=res,
      (err)=>console.log(err),
      ()=>{
  
          this.totalServices=this.waiters.reduce(function(prev, cur) {
            return prev + cur.jobs;
          }, 0);
      }
    )
  }

  getChefs(){
    this.usersService.getUsers('?role=Cuoco').subscribe(
      (res)=>this.chefs=res,
      (err)=>console.log(err),
      ()=>{
       this.totalDishes=this.chefs.reduce(function(prev, cur) {
          return prev + cur.jobs;
        }, 0);
      }

    )
  }

  getBarMans(){
    this.usersService.getUsers('?role=Barista').subscribe(
      (res)=>this.barMans=res,
      (err)=>console.log(err),
      ()=>{
        this.totalDrinks=this.barMans.reduce(function(prev, cur) {
          return prev + cur.jobs;
        }, 0);
      }
    )
  }


  getDesks(){
    this.usersService.getUsers('?role=Cassa').subscribe(
      (res)=>this.desks=res,
      (err)=>console.log(err),
      ()=>{
          this.totalCashed=this.desks.reduce(function(prev, cur) {
            return prev + cur.jobs;
          }, 0);
      }
    )
  }

  set(role:string){
    if(role=="Cameriere"){
      console.log(this.totalServices);
      return this.totalServices;
    }else if(role=="Cuoco"){
      return this.totalDishes;
    }else if(role=="Barista"){
      return this.totalDrinks;
    }else{
      return this.totalCashed;
    }
  }

  initChart(id:string,role:string,jobs:number){
  
      console.log(id+" "+jobs);
      this.stats=[];
      this.stats[0]=jobs;
      this.stats[1]=(this.set(role)-jobs);

      this.chart = new Chart(<HTMLCanvasElement>document.getElementById(id), {
      type: 'doughnut',
      data: {
        labels: ["User", "Others"],
        datasets: [
          {
            backgroundColor: ["#3e95cd", "#8e5ea2"],
            data: this.stats
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'job completati ',
          fontSize:20
        },
        scales:{
          scaleLabel:{
            fontSize:50
          }
        } 
      }
    });
  }

  deleteUser(user:string){
    this.usersService.deleteUser(user).subscribe(
      (res)=>console.log(res),
      (err)=>console.log(err),
      ()=>{
      ;}
    );

    
  }

}
