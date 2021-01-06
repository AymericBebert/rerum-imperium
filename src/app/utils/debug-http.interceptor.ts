import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable()
export class DebugHttpInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (environment.debugHttp) {
      console.log('http< :', request);
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          return throwError(`ErrorEvent: ${error.error.message}`);
        }
        return throwError(`Error Code: ${error.status}; Message: ${error.message}`);
      }),
      tap(response => environment.debugHttp && response instanceof HttpResponse && console.log('http> :', response))
    );
  }
}
