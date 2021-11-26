import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { UserComponent } from './user.component';
import { CanDeactivateGuard } from '../../guards/can-deactivate.guard';

@NgModule({
  declarations: [
    UsersComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: UsersComponent,
        canDeactivate: [CanDeactivateGuard],
        children: [
          {
            path: ':id',
            component: UserComponent
          }
        ]
      }
    ])
  ],
})
export class UserModule { }
