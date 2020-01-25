import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user';
import { UsersService } from 'src/app/services/users.service';
import * as $ from 'jquery'
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    open:boolean = false;
  
  
    constructor(private usersService:UsersService,private socketService:SocketService) { }
  
    ngOnInit() {
      if(this.usersService.user==null){
        let token=localStorage.getItem('user_token');
        if( token){
          this.usersService.parseToken(token);
        }
      }
      
      $('.OnOff').click(()=>{
        if(this.open){
          this.close();
        } 
      })
  
    }
  
    toggle(){
 
      if(this.open){
        $(".dual-nav").removeClass('show').addClass('hide');
        this.open=false;
      }else{
        $(".dual-nav").removeClass('hide').addClass('show');
        this.open=true;
      }
    }

    close(){
      $(".dual-nav").removeClass('show').addClass('hide');
      this.open=false;
    }
  
    exit(){
      this.usersService.user=null;
      localStorage.removeItem('user_token');
      this.socketService.socket.emit('disconnect');
    }
  
    isChef(){
      if(this.usersService.user && this.usersService.user.role=="Cuoco" ){
        return true;
      }else{
        return false;
      }
    }
  
    isBarman(){
      if(this.usersService.user && this.usersService.user.role=="Barista"){
        return true;
      }else{
        return false;
      }
    }
    
    isDesk(){
      if(this.usersService.user && this.usersService.user.role=="Cassa"){
        return true;
      }else{
        return false;
      }
    }
  
    isWaiter(){
      if(this.usersService.user && this.usersService.user.role=="Cameriere"){
        return true;
      }else{
        return false;
      }
    }

}
