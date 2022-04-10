
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface IMessage {text: string, type: MessageType}

export enum MessageType{
  Success, 
  Error
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private message$ = new Subject<IMessage>()

    onNew$ = this.message$.asObservable();
  

  constructor() { }

  notifyMessage(message: IMessage){
    this.message$.next(message)
  }

  clear():void {    
    this.message$.next({text: '', type: MessageType.Success})    
  }
}
