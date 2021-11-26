import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientXsrfModule } from '@angular/common/http';
import { ApiInterceptor } from './api.interceptor';
import { AuthInterceptor } from './auth.interceptor';

@NgModule({
  imports: [
    CommonModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN'
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class AuthCookieModule {
  constructor(@Optional() @SkipSelf() self: AuthCookieModule) {
    if (self) {
      throw new Error('AuthCookieModule importato piu di una volta')
    }
  }
}
