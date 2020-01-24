import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuItem } from 'src/models/menuItem';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http:HttpClient) { }

  newMenuItem(item:MenuItem){
    return this.http.post(`${environment.URL}/API/sm/menu`,item);
  }

  getMenu(query?:string){

    if(query){
      return this.http.get<any>(`${environment.URL}/API/sm/menu${query}`);
    }
    else return this.http.get<any>(`${environment.URL}/API/sm/menu`);
  }

  

}
