import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { OtpComponent } from './components/otp/otp.component';
import { ChatComponent } from './components/chat/chat.component';
import { httpInterceptorInterceptor } from './interceptor/http-interceptor.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileEditComponent,
    OtpComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:httpInterceptorInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
