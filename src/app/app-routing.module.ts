import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { OtpComponent } from './components/otp/otp.component';
import { ChatComponent } from './components/chat/chat.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'Profile_edit', component: ProfileEditComponent },
  { path: 'otp', component: OtpComponent },
  {path:'chat',component:ChatComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
