import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Recipt } from 'src/models/recipt';

@Injectable({
  providedIn: 'root'
})
export class ReciptsService {

  constructor(private http:HttpClient) { }

  getRecipts(query?:string){
    if(query)
      return this.http.get<any>(`${environment.URL}/API/sm/recipts${query}`);
    else 
      return this.http.get<any>(`${environment.URL}/API/sm/recipts`);

  }

  newRecipt(recipt:Recipt){
    return this.http.post(`${environment.URL}/API/sm/recipts`,recipt);
  }

}
