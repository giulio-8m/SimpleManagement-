import { Injectable } from '@angular/core';
import { User } from 'src/models/user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import {environment} from '../../environments/environment'
import { Observable, BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UsersService {

  user:User;
  userOb:BehaviorSubject<User>;


  constructor(private http:HttpClient,private router:Router) { 
    this.user=null;
    this.userOb=new BehaviorSubject(this.user);

    let token=localStorage.getItem('user_token');
    if(token){
      this.parseToken(token);
    }
  }

  signUp(user:User){
    return this.http.post<any>(`${environment.URL}/API/sm/users`,user);
  }

  signIn(user:User){
    return this.http.post<any>(`${environment.URL}/API/sm/users/login`,user);
  }

  parseToken (token:string){
    let decoded:User=jwt_decode(token);
    this.user=new User(decoded.username,null,decoded.role);
    this.user.jobs=decoded.jobs;
  }

  updateUser(username:string){
    return this.http.patch(`${environment.URL}/API/sm/users/${username}`,this.user);
  }

  getUsers(query?:string){
    if(query)
      return this.http.get<any>(`${environment.URL}/API/sm/users${query}`);
    else 
      return this.http.get<any>(`${environment.URL}/API/sm/users`);
  }

  deleteUser(username:string){
    return this.http.delete(`${environment.URL}/API/sm/users/${username}`);
  }

}
