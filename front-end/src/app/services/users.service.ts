import { Injectable } from '@angular/core';
import { User } from 'src/models/user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import {environment} from '../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  user:User;

  constructor(private http:HttpClient,private router:Router) { 
    this.user=null;
    let token=localStorage.getItem('user_token');
    if(token){
      let decoded:User=jwt_decode(token);
      this.user=new User(decoded.username,null,decoded.role);
    }
  }

  signUp(user:User){
    return this.http.post<any>(`${environment.URL}`,user);
  }

  signIn(user:User){
    return this.http.post<any>(`${environment.URL}`,user);
  }




  parseToken(token:string){
    let decoded:User=jwt_decode(token);
    this.user=new User(decoded.username,null,decoded.role);
  }





}
