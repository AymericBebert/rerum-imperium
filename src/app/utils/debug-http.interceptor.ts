import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {APP_CONFIG, AppConfig} from '../../config/app.config';

@Injectable()
export class DebugHttpInterceptor implements HttpInterceptor {
  private config = inject<AppConfig>(APP_CONFIG);


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.config.debugHttp) {
      console.log('http< :', request);
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          return throwError(() => new Error(`ErrorEvent: ${error.error.message}`));
        }
        return throwError(() => new Error(`Error Code: ${error.status}; Message: ${error.message}`));
      }),
      tap(response => this.config.debugHttp && response instanceof HttpResponse && console.log('http> :', response))
    );
  }
}
