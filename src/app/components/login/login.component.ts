import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private _toastr: ToastrService, private _userService: UserService, private _router: Router) { }


  email!: string
  validateEmail(email: string) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }
  login() {
    if (this.validateEmail(this.email)) {
  
      this._userService.login(this.email).subscribe({
        next: (res:any) => {
          this._router.navigate(['otp'],{queryParams:{email:res['email']}})
          this._toastr.success('otp send to email', 'success')  
        },
        error: (err) => {
          console.log(err);

        }

      })

    } else {
      this._toastr.warning('Invalid email address', 'Invalid')
    }

  }
}
