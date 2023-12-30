import { HttpInterceptorFn } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError, } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CoreService } from 'src/app/services/core.service';

@Injectable()
export class requestInterceptor implements HttpInterceptor {
  constructor(private core: CoreService) { }

  appendViolations(violations: any){
    var violationString = '';
    if(!violations) return '';
    for (var key in violations) {
      // skip loop if the property is from prototype
      if (!violations.hasOwnProperty(key)) continue;

      var obj = violations[key];
      for (var prop in obj) {
        // skip loop if the property is from prototype
        if (!obj.hasOwnProperty(prop)) continue;

        // your code
        violationString += '\nViolation ' + prop + ' ' + obj[prop] + ' ';
      }
    }
    return violationString;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    //To handle violations
    if (request.url.endsWith('TEST')) {
      return next.handle(request).pipe(
        catchError(err => {
          this.core.openSnackBar('Error ' + err.status + ' ' + err.statusText + '. ' + this.appendViolations(err.error.violations), 'OK', 'Error');
          return throwError(err);
        })
      );
    }
    // if(request.url.endsWith('login')){
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (event.status == 200) {
            console.log('Response status code 200 intercepted:', event);
          }
          if (event.status == 304) {
            console.log('Response status code 304 intercepted:', event);
          }
          if (event.status == 500) {
            console.log('Response status code 304 intercepted:', event);
          }
        }
        return event;
      })
    );
    // }
    // return next.handle(request);
  }
};
