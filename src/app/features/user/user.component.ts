import { Component } from '@angular/core';
import { UserStore } from './user.store';

@Component({
  selector: 'app-user',
  template: `
    User
    {{ userStore.userId$ | async }}

    {{ (userStore.activeUser$ | async)?.username }}
  `,
  providers: [UserStore]
})
export class UserComponent {

  constructor(public userStore: UserStore) {}
}
