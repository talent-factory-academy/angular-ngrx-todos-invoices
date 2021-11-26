import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from '../oauth/oauth.service';

@Component({
  selector: 'app-oauth',
  template: `
    <button (click)="login()">Login</button>
  `
})
export class OAuthComponent {

  constructor(
    private oauthService: OAuthService,
    private router: Router
  ) {}

  login() {
    this.oauthService.login().subscribe(() => {
      this.router.navigateByUrl('/');
    })
  }
}
