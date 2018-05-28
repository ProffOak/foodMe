import {
  HttpRequest,
  HttpHandler, HttpInterceptor, HttpEvent,
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AuthService} from '../auth.service';
import {Observable} from 'rxjs/index';
import {switchMap} from 'rxjs/internal/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.auth.getToken().pipe(switchMap(token => {
      if (token) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
      }
      return next.handle(request);

    }));
  }
}
