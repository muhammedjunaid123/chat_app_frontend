import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user/user.service';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css'
})
export class OtpComponent {
  constructor(private _fb: FormBuilder,
    private _toastr: ToastrService,
    private _userservice: UserService,
    private _ActivatedRoute: ActivatedRoute,
    private _router: Router
  ) { }
  @ViewChildren('otp0, otp1, otp2, otp3') otpInputs!: QueryList<ElementRef>;
  form_data!: FormGroup
  minutes: number = 1;
  seconds: number = 45;
  timerFinished: boolean = false;
  private timer: any;
  email!: string
  ngOnInit() {
    this.startTimer();
    this.form_data = this._fb.group({
      otp1: ['', Validators.required],
      otp2: ['', Validators.required],
      otp3: ['', Validators.required],
      otp4: ['', Validators.required],
    })
    this._ActivatedRoute.queryParamMap.subscribe(res => {
      this.email = res.get('email') || ''
      console.log(this.email);

    })
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  startTimer() {
    this.timer = setInterval(() => {
      if (this.seconds === 0) {
        if (this.minutes === 0) {
          this.timerFinished = true;
          clearInterval(this.timer);
        } else {
          this.minutes--;
          this.seconds = 59;
        }
      } else {
        this.seconds--;
      }
    }, 1000);
  }

  onInput(event: any, index: number) {
    const input = event.target;
    if (input.value.length > 0 && index < this.otpInputs.length - 1) {
      this.otpInputs.toArray()[index + 1].nativeElement.focus();
    }
  }

  onKeyDown(event: any, index: number) {
    const input = event.target;
    if (event.key === 'Backspace' && input.value.length === 0 && index > 0) {
      this.otpInputs.toArray()[index - 1].nativeElement.focus();
    }
  }

  resendOtp() {
    this.minutes = 1;
    this.seconds = 45;
    this.timerFinished = false;
    this.startTimer();
  }

  submit() {
    if (!this.form_data.valid) {
      this._toastr.error('please enter the otp')
      return
    }

    let data = this.form_data.value
    if (data['otp1'] == ' ') {
      this._toastr.error('please enter the otp')
      return
    }
    if (data['otp2'] == ' ') {
      this._toastr.error('please enter the otp')
      return
    }
    if (data['otp3'] == ' ') {
      this._toastr.error('please enter the otp')
      return
    }
    if (data['otp4'] == ' ') {
      this._toastr.error('please enter the otp')
      return
    }
    let otp = data['otp1'] + data['otp2'] + data['otp3'] + data['otp4']
    this._userservice.otp_verify(otp, this.email).subscribe({
      next: (res:any) => {
        localStorage.setItem(environment.UserSecret,res['token'])
        this._router.navigate(['Profile_edit'],{queryParams:{email:this.email}})
      },
      error: (err) => {
        console.log(err);

        this._toastr.error(err?.error['message'], 'Error')

      },
    })
  }
}





