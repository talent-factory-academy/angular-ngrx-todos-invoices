import { Injectable } from '@angular/core';
import { HttpContextToken, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, tap } from 'rxjs/operators';

export const RETRY_COUNT = new HttpContextToken(() => 3);
export const ERROR_COUNT = new HttpContextToken(() => 0);

@Injectable()
export class RetryInterceptor implements HttpInterceptor {

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const retryCount = req.context.get(RETRY_COUNT);

    return next.handle(req).pipe(
      tap({
        error: () => {
          req.context.set(ERROR_COUNT, req.context.get(ERROR_COUNT) + 1);
        }
      }),
      retry(retryCount),
    )
  }
}
