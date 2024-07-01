import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private _toastr: ToastrService){}


email!:string
 validateEmail(email:string) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}
login(){
  if(this.validateEmail(this.email)){
    this._toastr.success('Valid email address','Valid')
  }else{
    this._toastr.warning('Invalid email address','Invalid')
  }
  
}
}
