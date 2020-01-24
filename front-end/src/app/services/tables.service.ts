import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Table } from 'src/models/table';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TablesService {



  constructor(private http:HttpClient) { }


  newTable(table:Table){
    return this.http.post<any>(`${environment.URL}/API/sm/tables`,table);
  }

  updateTable(tableCode:string,table?:Object){
    return this.http.patch<any>(`${environment.URL}/API/sm/tables/${tableCode}`,table);
  }

  getTables(){
    return this.http.get<any>(`${environment.URL}/API/sm/tables`);
  }


}
