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
    console.log(table);
    return this.http.post<any>(`${environment.URL}/tables`,table);
  }

  updateTable(tableCode:string,table?){
    return this.http.put<any>(`${environment.URL}/tables/${tableCode}`,table);
  }

  getTables(){
    return this.http.get<any>(`${environment.URL}/tables`);
  }


}
