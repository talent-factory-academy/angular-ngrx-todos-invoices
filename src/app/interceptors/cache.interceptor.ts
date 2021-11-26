import { Inject, Injectable, InjectionToken } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { startWith, tap } from 'rxjs/operators';

export const CACHE_VERSION = new InjectionToken<string>('Cache version to be used with interceptor');
export const CACHE_BLACKLIST = new InjectionToken<string[]>('...');

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

  private cache = new Map<string, HttpResponse<any>>();

  constructor(
    @Inject(CACHE_VERSION) private version: string,
    @Inject(CACHE_BLACKLIST) private blacklist: string[]
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    if (
      !this.isCacheable(req)
      || this.blacklist.find(entry => entry.includes(req.urlWithParams))) {
      return next.handle(req);
    }

    const cachedReponse = this.cache.get(req.urlWithParams);

    if (this.version === 'V1') {
      // V1 - Ritorna la cache se presente
      return cachedReponse
        ? of(cachedReponse)
        : this.sendRequest(req, next);
    }

    if (this.version === 'V2') {
      // V2 - Ritorna la cache, e poi la vera chiamata
      return cachedReponse
        ? this.sendRequest(req, next).pipe(startWith(cachedReponse))
        : this.sendRequest(req, next);
    }

    return next.handle(req);
  }

  private sendRequest(
    req: HttpRequest<any>,
    next: HttpHandler
  ) {
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.cache.set(req.urlWithParams, event);
        }
      })
    )
  }

  private isCacheable(req: HttpRequest<any>) {
    return req.method === 'GET';
  }
}
