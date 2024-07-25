import { Injectable } from '@angular/core';
import { Socket, io } from "socket.io-client";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { user } from '../../../types/user_interface';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket = io('http://localhost:3000');
  constructor(private _http: HttpClient) { }

  user_list(): Observable<user[]> {
    return this._http.get<user[]>('/user/user_list')
  }
  set_chat(email: string) {
    
    return this._http.post('/user/single_chat_setup', { email: email })
  }
}
