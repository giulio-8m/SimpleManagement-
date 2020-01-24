import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user';
import { UsersService } from 'src/app/services/users.service';
import { Location } from '@angular/common'
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  user:User;
  passwordConfirmation:string;
  errorMessage:string;

  constructor(private usersService:UsersService,private socketService:SocketService,private location:Location) { }

  ngOnInit() {
    this.user=new User(null,null,null);
    this.passwordConfirmation=null;
  }

  public submit(){
    this.usersService.signUp(this.user).subscribe(
      (res)  => {},
      (err) => {
        this.errorMessage=err.statusText;
        console.log(this.errorMessage);
      },
      ()=> {this.socketService.socket.emit('updateUsers');
        this.location.back()}
    );
  }

  passwordMatching():boolean{
  
    return this.user.password === this.passwordConfirmation;
  }

}
