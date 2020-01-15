import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cash-desk',
  templateUrl: './cash-desk.component.html',
  styleUrls: ['./cash-desk.component.css']
})
export class CashDeskComponent implements OnInit {

  time:Date;

  constructor() { }

  ngOnInit() {
    this.time=new Date();
    setInterval(() => {
      this.time = new Date();
   }, 1000);
  }
}
