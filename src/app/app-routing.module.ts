import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { OtpComponent } from './components/otp/otp.component';
import { ChatComponent } from './components/chat/chat.component';
import { loginGuard } from './guards/login.guard';
import { logoutGuard } from './guards/logout.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent,canActivate:[logoutGuard] },
  { path: 'Profile_edit', component: ProfileEditComponent,canActivate:[loginGuard] },
  { path: 'otp', component: OtpComponent ,canActivate:[logoutGuard]},
  {path:'chat',component:ChatComponent,canActivate:[loginGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
