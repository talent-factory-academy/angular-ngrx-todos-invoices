import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <button routerLink="">Home</button>
    <button routerLink="users">Users</button>
<!--    <button routerLink="users/1">User 1</button>-->
<!--    <button routerLink="users/2">User 2</button>-->
<!--    <button routerLink="users/3">User 3</button>-->

<!--    <button routerLink="/login">Login</button>-->
<!--    <button routerLink="/register">Register</button>-->

    <button routerLink="/oauth">OAuth</button>
    <hr>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
}
