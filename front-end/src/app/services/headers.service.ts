import { Injectable } from '@angular/core';
import { HttpRequest, HttpInterceptor, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeadersService implements HttpInterceptor{

  constructor(/*token*/){

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    var tk=localStorage.getItem('user_token');
    if (tk) {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${tk}`
            }
        });
    }

    return next.handle(request);
  }
}
