import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild, CanLoad, Route,
  Router,
  RouterStateSnapshot, UrlSegment,
  UrlTree
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthCookieService } from '../auth-cookie/auth-cookie.service';
import { catchError, mapTo, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(
    private authService: AuthCookieService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.fetchUser().pipe(
      take(1),
      mapTo(true),
      catchError(() => {
        this.router.navigateByUrl('/login');
        return of(false);
      })
    )
  }

  canActivateChild() {
    return this.canActivate();
  }

  canLoad() {
    return this.canActivate();
  }
}
