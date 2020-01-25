import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from 'src/models/order';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http:HttpClient) { }

  sendOrder(where:string,order:Order){
      return this.http.post(`${environment.URL}/API/sm/${where}`,order);
  }

  getOrders(where:string,query?:string){
      if(query)
        return this.http.get<any>(`${environment.URL}/API/sm/${where}${query}`);
      else
        return this.http.get<any>(`${environment.URL}/API/sm/${where}`);
    
  }

  updateOrder(where:string,order:Order){
      return this.http.put(`${environment.URL}/API/sm/${where}/${order._id}`,order);

  }

  checkOut(where:string,tableCode:string){
    let order={status:"pagato"};
    return this.http.patch(`${environment.URL}/API/sm/${where}?tableCode=${tableCode}`,order);
  }




}
