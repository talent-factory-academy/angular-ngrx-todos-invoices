import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary">
      <a mat-button routerLink="/">
        Home
      </a>
      <button mat-button routerLink="/todos">
        Todos
      </button>
      <button mat-button routerLink="/invoices">
        Invoices
      </button>
    </mat-toolbar>

    <router-outlet></router-outlet>
  `
})
export class AppComponent {
}
