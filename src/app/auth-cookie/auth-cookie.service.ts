import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserStore } from '../user.store';
import { Observable, of } from 'rxjs';
import { environment as env } from '../../environments/environment';
import { User } from './model';
import { switchMap, switchMapTo, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthCookieService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private userStore: UserStore
  ) {
    this.http.get<void>(`${env.apiUrl}/csrf-token`).subscribe();
  }

  register(credentials: { email: string, password: string, name: string, surname: string }): Observable<boolean> {
    return this.http.post<boolean>(`${env.apiUrl}/register`, credentials);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${env.apiUrl}/login`, { email, password }).pipe(
      switchMapTo(this.fetchUser())
    )
  }

  logout(): void {
    this.http.get<any>(`${env.apiUrl}/logout`).subscribe(() => {
      this.userStore.removeUser();
      this.router.navigateByUrl('/login');
    })
  }

  fetchUser(forceReload = false): Observable<User> {
    return this.userStore.user$.pipe(
      take(1),
      switchMap(user => {
        if (!!user && !forceReload) {
          return of(user);
        }
        return this.http.get<any>(`${env.apiUrl}/me`).pipe(
          tap(u => this.userStore.setUser(u))
        )
      })
    )
  }
}
