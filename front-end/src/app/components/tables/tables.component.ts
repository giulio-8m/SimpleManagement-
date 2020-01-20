import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
import { Table } from 'src/models/table';
import { SocketService } from 'src/app/services/socket.service';
import { TablesService } from 'src/app/services/tables.service';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {

  tables:Array<Table>;
  errorMessage:String;

  constructor(private usersService:UsersService,private socketService:SocketService,private tablesService:TablesService,private router:Router) { }

  ngOnInit() {  

    this.socketService.socket.on('updateTables',()=>{
      this.getTables();
    })
    this.getTables();
  }

  getTables(){
    this.tablesService.getTables().subscribe(
      (res) => { this.tables = res },
      (err)=>this.errorMessage = err.statusText,
      () => { }           
    );
  }

  free(seats:number){
    return seats==0;
  }

  previous(event,table:Table){
    this.router.navigate(['/orders-desk',table.tableCode]);
  }

  book(table:Table){
    
    this.tablesService.updateTable(table.tableCode,table).subscribe(
      (res)=>{},
      (err)=>this.errorMessage = err.statusText,
      ()=>{this.socketService.socket.emit('updateTables');});
  }

  ordine(event,table:Table){
    this.router.navigate(['/order',table.tableCode,table.clients]);
  }

  search(){
    let input = (<HTMLInputElement>document.getElementById("searchTables")).value;
    let filter = input.toLowerCase();
    console.log(filter);
    let listOfUsers = document.getElementById("list-of-ttables");
    console.log(listOfUsers);
    let ttables = listOfUsers.getElementsByClassName("ttable");
    console.log(ttables);
    let ttable;
    let ttablename:string;
    for(var i=0;i<ttables.length;i++){
      ttable=ttables[i].getElementsByClassName('code')[0];
      console.log(ttable);
      ttablename=ttable.textContent.toLowerCase();
      console.log(ttablename)
      if(ttablename.indexOf(filter) > -1) {
        $(ttables[i]).css('display' , "");
      } else {
        $(ttables[i]).css('display' , "none");
      }
    }
  }

  isDesk(){
    return this.usersService.user.role=="Cassa";
  }

  checkOut(event,table:Table){
    this.router.navigate(['/check-out',table.tableCode,table.clients]);
  }


}

