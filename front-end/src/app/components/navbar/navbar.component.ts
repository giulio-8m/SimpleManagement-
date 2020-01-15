import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user';
import { UsersService } from 'src/app/services/users.service';
import * as $ from 'jquery'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    open:boolean = false;
  
  
    constructor(private usersService:UsersService) { }
  
    ngOnInit() {
      if(this.usersService.user==null){
        let token=localStorage.getItem('user_token');
        if( token){
          this.usersService.parseToken(token);
        }
      }
  
      $('.container').click(()=>{
        if(this.open){
          console.log("hello container");
          this.toggle();
        } 
      })
  
    }
  
    toggle(){
      
      if(this.open){
        $(".dual-nav").removeClass('show').addClass('collapsing');
        this.open=false;
      }else{
        $(".dual-nav").removeClass('collapsing').addClass('show');
        this.open=true;
      }
    }

    close(){
      $(".dual-nav").removeClass('show').addClass('collapsing');
      this.open=false;
    }
  
    exit(){
      this.usersService.user=null;
      localStorage.removeItem('user_token');
    }
  
    isChef(){
      if(this.usersService.user && this.usersService.user.username=="cane"){
        return true;
      }
      if(this.usersService.user && this.usersService.user.role=="Cuoco" ){
        return true;
      }else{
        return false;
      }
    }
  
    isBarman(){
      if(this.usersService.user && this.usersService.user.username=="cane"){
        return true;
      }
      if(this.usersService.user && this.usersService.user.role=="Barista"){
        return true;
      }else{
        return false;
      }
    }
    
    isDesk(){
      if(this.usersService.user && this.usersService.user.username=="cane"){
        return true;
      }
      if(this.usersService.user && this.usersService.user.role=="Cassa"){
        return true;
      }else{
        return false;
      }
    }
  
    isWaiter(){
      if(this.usersService.user && this.usersService.user.username=="cane"){
        return true;
      }
      if(this.usersService.user && this.usersService.user.role=="Cameriere"){
        return true;
      }else{
        return false;
      }
    }

}
