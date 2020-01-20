import { Injectable } from '@angular/core';
import * as io from 'socket.io-client'
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SocketService {

 socket:SocketIOClient.Socket;

  constructor(){ 
    this.socket=null;
    this.connect();
  }

  connect(){
    this.socket = io.connect(`${environment.URL}`);
    this.socket
        .emit('authenticate', {token: localStorage.getItem('user_token')}) //send the jwt
        .on('authenticated', function () {
          console.log("You are authenticated!");
        })
        .on('unauthorized', function(msg) {
          console.error("unauthorized: " + JSON.stringify(msg.data));
          throw new Error(msg.data.type);
        })
        .on('disconnect', function(){
          console.log("disconnected");
        });
  }
}
