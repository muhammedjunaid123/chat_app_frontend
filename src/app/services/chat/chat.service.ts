import { Injectable } from '@angular/core';
import { Socket, io } from "socket.io-client";
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { user } from '../../../types/user_interface';
import { environment } from '../../../environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public message$: BehaviorSubject<string> = new BehaviorSubject('');
   authToken=localStorage.getItem(environment.UserSecret)
  private socket = io('http://localhost:3000',{query:{token:this.authToken}});
  constructor(private _http: HttpClient) { }

  user_list(): Observable<user[]> {
    return this._http.get<user[]>('/user/user_list')
  }
  set_chat(email: string) {
    return this._http.post('/user/single_chat_setup', { email: email })
  }
  chat_list() {
    return this._http.get('/user/chat_list')
  }
  user_message(id: string) {
    return this._http.get(`/user/user_message?id=${id}`)
  }
  send_msg(msg: string,id:string,user_email:string) {
    this.socket.emit('send_msg',{ msg:msg,id:id,user_email:user_email})
  }
  get_msg() {
    this.socket.on('message', (data) => {
      this.message$.next(data)
    })
    return this.message$.asObservable();
  }
}
