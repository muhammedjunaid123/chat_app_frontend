import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { loginGuard } from '../../guards/login.guard';
import { user } from '../../../types/user_interface';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.css'
})
export class ProfileEditComponent implements OnInit {
  email!: string
  user_data!: user
  user_form!: FormGroup
  files!: File
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _UserService: UserService,
    private _fb: FormBuilder,
    private _user_service: UserService
  ) { }
  ngOnInit(): void {
    this.user_form = this._fb.group({
      name: [null, Validators.required]
    })

    this._ActivatedRoute.queryParamMap.forEach((res) => {
      this.email = res.get('email') || ''
      this._UserService.get_user(this.email).subscribe((res: user) => {
        this.user_data = res
        this.user_form.setValue({
          name: this.user_data['user_name'] ?? '',
        })
      })
    })
  }
  image(event: any) {
    const file: File = event.target.files[0];
    this.files = file
  }


  submit() {
    let data = this.user_form.getRawValue()
    const form = new FormData()
    form.append('name', data.name)
    form.append('image', this.files)
    this._user_service.set_user_data(form, this.user_data._id).subscribe((res) => {

      this._UserService.get_user(this.email).subscribe((res: user) => {
        this.user_data = res
        this.user_form.setValue({
          name: this.user_data['user_name'] ?? '',
        })
      })
    })

  }
}
