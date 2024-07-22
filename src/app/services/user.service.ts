import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { user } from '../../types/user_interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  login(email: string) {
    return this._http.post('/user/login', { email: email })
  }
  otp_verify(otp: string, email: string) {
    return this._http.post('/user/otp', { email: email, otp: otp })
  }
  get_user(email: string): Observable<user> {
    return this._http.get<user>(`/user/get_user?email=${email}`)
  }
  set_user_data(data:any,id:string){
   return this._http.post(`/user/set_user_data?id=${id}`,data)  
  }
}
