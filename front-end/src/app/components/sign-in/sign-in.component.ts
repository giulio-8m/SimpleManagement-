import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  public user:User;
  public errorMessage:string;

  constructor(private usersService:UsersService) { }

  ngOnInit() {
    this.user=new User(null,null,null);
    this.errorMessage=null;
  }

  public submit(){
    this.usersService.signIn(this.user).subscribe(
      (res) => { localStorage.setItem('user_token',res);
                this.usersService.parseToken(res) },
      (error) => {
        this.errorMessage=error.statusText;
        console.log(this.errorMessage);
      },
    );

  }

}
