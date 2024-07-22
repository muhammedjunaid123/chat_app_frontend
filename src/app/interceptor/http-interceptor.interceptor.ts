import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { catchError, Observable, take, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { NgxSpinnerService } from 'ngx-spinner';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class httpInterceptorInterceptor implements HttpInterceptor {

  constructor(private _spinner: NgxSpinnerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._spinner.show()
    const usertoken = localStorage.getItem(environment.UserSecret)

    let newRequest = req
    newRequest = req.clone({
      headers: newRequest.headers.set('Authorization', 'Bearer ' + usertoken),
      url: environment.apiurl + req.url
    })

    return next.handle(newRequest).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this._spinner.hide()
        }
      }),
      catchError((error: HttpErrorResponse) => {
        this._spinner.hide()
        return throwError(() => error)
      })
    )

  }

};
