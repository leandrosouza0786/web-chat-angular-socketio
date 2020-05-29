import { Message } from './message';
import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {

  private url = "http://localhost:4444";
  private socket = socketIo(this.url);
  private subMessages : Subject<Message> = new Subject<Message>();

  constructor() { 
    this.socket.on('message', (m : Message) =>{
      this.subMessages.next(m);
    });
  }

  send(msg : Message){
    this.socket.emit('message', msg)
  }

  messages(){
    return this.subMessages.asObservable();
  }
}
