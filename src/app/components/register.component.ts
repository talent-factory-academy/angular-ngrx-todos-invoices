import { Component } from '@angular/core';
import { AuthCookieService } from '../auth-cookie/auth-cookie.service';

@Component({
  selector: 'app-register',
  template: `
    <form #f="ngForm" (ngSubmit)="onSubmit(f.value)">
      <input type="text" ngModel name="email" placeholder="email">
      <input type="text" ngModel name="name" placeholder="name">
      <input type="text" ngModel name="surname" placeholder="surname">
      <input type="text" ngModel name="password" placeholder="password">
      <button>Register</button>
    </form>
    {{ message }}
  `
})
export class RegisterComponent {

  message = '';

  constructor(
    private authService: AuthCookieService
  ) {}

  onSubmit(formValue: any) {
    this.authService.register(formValue).subscribe({
      next: () => {
        this.message = 'Registration successful!'
      },
      error: () => {
        this.message = 'Registration failed!'
      }
    })
  }
}
