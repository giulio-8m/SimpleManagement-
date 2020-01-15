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

    return this.http.get<any>(`${environment.URL}/recipts${query}`);

  }

  newRecipt(recipt:Recipt){
    return this.http.post(`${environment.URL}/recipts`,recipt);
  }

}
