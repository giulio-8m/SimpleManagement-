export class User {

    constructor(username:string,password:string,role:string){
       this.username=username;
       this.password=password;
       this.role=role;
       this.jobs=0;
    }
 
    username:string;
    password:string;
    role:string;
    salt:string;
    jobs:number;
 }