import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'Profile_edit',component:ProfileEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
