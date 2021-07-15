import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {APP_CONFIG, AppConfig} from '../../config/app.config';

@Injectable()
export class DebugHttpInterceptor implements HttpInterceptor {
  constructor(@Inject(APP_CONFIG) private config: AppConfig) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.config.debugHttp) {
      console.log('http< :', request);
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          return throwError(`ErrorEvent: ${error.error.message}`);
        }
        return throwError(`Error Code: ${error.status}; Message: ${error.message}`);
      }),
      tap(response => this.config.debugHttp && response instanceof HttpResponse && console.log('http> :', response))
    );
  }
}
