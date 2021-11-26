import { Component } from '@angular/core';
import { CanComponentDeactivate } from '../../guards/can-deactivate.guard';
@Component({
  selector: 'app-users',
  template: `
    Users
    <hr>
    <router-outlet></router-outlet>
  `,
})
export class UsersComponent implements CanComponentDeactivate {

  canDeactivate() {
    return confirm('Sei sicuro?');
  }
}
