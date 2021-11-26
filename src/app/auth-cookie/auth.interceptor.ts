import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserStore } from '../user.store';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private userStore: UserStore,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap({
        error: error => {
          if (
            error instanceof HttpErrorResponse
            && error.status === 401) {
            this.userStore.removeUser();
            this.router.navigateByUrl('/login');
          }
        }
      })
    )
  }
}
