import { Directive, Injectable } from '@angular/core';
import { UserService } from '../features/user/user.service';
import { AbstractControl, AsyncValidator, AsyncValidatorFn, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { catchError, debounceTime, first, map, take } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserValidator {
  constructor(private userService: UserService) {}

  validate(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return this.userService.getUsers().pipe(
        map(users => {
          const found = users.find((user: any) => {
            const name = user.name.split(' ')[0];
            return name === control.value
          });

          return found
            ? null
            : { userValidator: true }
        }),
        catchError(() => of(null)),
      )
    }
  }
}

@Directive({
  selector: '[forbiddenUser]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: ForbiddenUser,
      multi: true
    }
  ]
})
export class ForbiddenUser implements AsyncValidator {

  constructor(private userValidator: UserValidator) {}

  validate(control: AbstractControl) {
    return this.userValidator.validate()(control);
  }
}
