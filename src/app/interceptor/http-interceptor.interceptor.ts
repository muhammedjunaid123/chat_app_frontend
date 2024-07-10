import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, take, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';

export class httpInterceptorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const usertoken=localStorage.getItem(environment.UserSecret)
  
    let newRequest =req
    newRequest=req.clone({
      headers:newRequest.headers.set('Authorization', 'Bearer ' + usertoken),
          url: environment.apiurl + req.url
        })

    return next.handle(newRequest).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {

        }
      }))
  }

};
