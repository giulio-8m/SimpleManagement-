import { Injectable } from '@angular/core';
import * as io from 'socket.io-client'


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
    this.socket = io.connect(`http://localhost:3000`);
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
