import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user';
import { UsersService } from 'src/app/services/users.service';
import { SocketService } from 'src/app/services/socket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  public user:User;
  public errorMessage:string;

  constructor(private usersService:UsersService,private router:Router,private socketService:SocketService) { }

  ngOnInit() {
    this.user=new User(null,null,null);
    this.errorMessage=null;
  }

  public submit(){
    this.usersService.signIn(this.user).subscribe(
      (res) => { localStorage.setItem('user_token',res);
                this.usersService.parseToken(res);
                this.socketService.connect();
              
              },
      (error) => {
        this.errorMessage=error.statusText;
        console.log(this.errorMessage);
      },
    ()=>{

      if(this.usersService.user.role=="Cameriere"){
        this.router.navigate(['/tables']);
      }else if(this.usersService.user.role=="Barista"){
        this.router.navigate(['/bar']);
      }else if(this.usersService.user.role=="Cuoco"){
        this.router.navigate(['/kitchen']);
      }else if(this.usersService.user.role=="Cassa"){
        this.router.navigate(['/cash-desk']);
      }else
        this.router.navigate(['/home']);

    }
    );

  }

}
