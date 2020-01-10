import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  user:User;
  passwordConfirmation:string;
  errorMessage:string;

  constructor(private usersService:UsersService) { }

  ngOnInit() {
    this.user=new User(null,null,null);
    this.passwordConfirmation=null;

  }

  public submit(){
    this.usersService.signUp(this.user).subscribe(
      (res) => {console.log("success registrato")},
      (error) => {
        this.errorMessage=error.statusText;
        console.log(this.errorMessage);
      },
    );
  }

  passwordMatching():boolean{
  
    return this.user.password === this.passwordConfirmation;
  }

}
