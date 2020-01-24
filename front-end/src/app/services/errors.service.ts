import { Injectable } from '@angular/core';
import { HttpRequest, HttpInterceptor, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService implements HttpInterceptor {
  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    return next.handle(req).pipe(catchError(err => {
      if (err.error instanceof ErrorEvent) {
        console.error('An error occurred:', err.error.message);
      } else {
  
        console.error(
          `Backend returned code ${err.status}, ` +
          `body was: ${err.message}`);
      }
      return throwError(err);
     }));
  }
}
