import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { NoopInterceptor } from './interceptors/noop.interceptor';
import { CACHE_BLACKLIST, CACHE_VERSION, CacheInterceptor } from './interceptors/cache.interceptor';
import { ForbiddenValidator } from './validators/forbidden.validator';
import { ForbiddenCredentialsValidator } from './validators/forbidden-credentials.validator';
import { ForbiddenAsyncValidator } from './validators/forbidden-async.validator';
import { ForbiddenUser } from './validators/user.validator';
import { CounterComponent } from './components/counter.component';
import { AddressComponent } from './components/address.component';
import { AuthCookieModule } from './auth-cookie/auth-cookie.module';
import { FormComponent } from './components/form.component';
import { RegisterComponent } from './components/register.component';
import { LoginComponent } from './components/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { GlobalErrorHandler } from './global-error-handler';
import { IfLoggedDirective } from './if-logged.directive';
import { OAuthComponent } from './components/oauth.component';
import { OAuthCallbackComponent } from './components/oauth-callback.component';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './store/counter/counter.reducer';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ForbiddenValidator,
    ForbiddenCredentialsValidator,
    ForbiddenAsyncValidator,
    ForbiddenUser,
    CounterComponent,
    AddressComponent,
    FormComponent,
    RegisterComponent,
    LoginComponent,
    IfLoggedDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'users',
        loadChildren: () => import('./features/user/user.module').then(m => m.UserModule),
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'oauth',
        component: OAuthComponent
      },
      {
        path: 'auth-callback',
        component: OAuthCallbackComponent
      },
    ]),
    StoreModule.forRoot({
      counter: counterReducer,
    })
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    }
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: NoopInterceptor,
    //   multi: true
    // },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: CacheInterceptor,
    //   multi: true
    // },
    // {
    //   provide: CACHE_VERSION,
    //   useValue: 'V2',
    // },
    // {
    //   provide: CACHE_BLACKLIST,
    //   useValue: [
    //     '/users'
    //   ]
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
