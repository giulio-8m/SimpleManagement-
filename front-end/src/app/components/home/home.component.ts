import { Component, OnInit } from '@angular/core';
import { Table } from 'src/models/table';

import { MenuItem } from 'src/models/menuItem';
import { MenuService } from 'src/app/services/menu.service';

import { TablesService } from 'src/app/services/tables.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  name:string;
  type:string;
  price:number;
  time:number;

  tableCode:string;
  seats:number;
  
  constructor(private menuService:MenuService,private tableService:TablesService) { }

  ngOnInit() {
  }

  
  newTable(){
    let table=new Table(this.tableCode,this.seats);
    this.tableService.newTable(table).subscribe(
      (res)=>console.log(res),
      (err)=>console.log(err),
      ()=> console.log("done")
    );

  }

  newMenuItem(){
    let menuItem:MenuItem=new MenuItem(this.name,this.type,this.price,this.time);
    this.menuService.newMenuItem(menuItem).subscribe(
      (res)=>console.log(res),
      (err)=>console.log(err),
      ()=> console.log("done")
    );
    
  }


  getMenu(){
    this.menuService.getMenu().subscribe(
      (res)=>console.log(res),
      (err)=>console.log(err),
      ()=> console.log("done")
    );
  }



}
