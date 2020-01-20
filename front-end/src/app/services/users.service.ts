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
      this.parseToken(token);
    }
  }

  signUp(user:User){
    return this.http.post<any>(`${environment.URL}/users`,user);
  }

  signIn(user:User){
    return this.http.post<any>(`${environment.URL}/users/login`,user);
  }

  parseToken (token:string){
    let decoded:User=jwt_decode(token);
    this.user=new User(decoded.username,null,decoded.role);
    this.user.jobs=decoded.jobs;
  }

  updateUser(username:string){
    return this.http.put(`${environment.URL}/users/${username}`,this.user);
  }

  getUsers(query?:string){
    return this.http.get<any>(`${environment.URL}/users${query}`);
  }

  deleteUser(username:string){
    return this.http.delete(`${environment.URL}/users/${username}`);
  }

}
