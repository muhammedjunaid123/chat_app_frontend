import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http:HttpClient){ }

  login(email:string){
     return this._http.post('http://localhost:3000/user/login',{email:email})
  }
  otp_verify(otp:string,email:string){
    return this._http.post('http://localhost:3000/user/otp',{email:email,otp:otp})
  }
}
