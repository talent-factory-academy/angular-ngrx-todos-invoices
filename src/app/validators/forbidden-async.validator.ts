import { AbstractControl, AsyncValidator, AsyncValidatorFn, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { Directive, Input } from '@angular/core';

export function forbiddenAsyncValidator(name: string): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return timer(2000).pipe(
      map(() => {
        return control?.value === name
          ? { forbidden: true }
          : null;
      })
    )
  }
}

@Directive({
  selector: '[forbiddenAsync]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: ForbiddenAsyncValidator,
      multi: true
    }
  ]
})
export class ForbiddenAsyncValidator implements AsyncValidator {

  @Input('forbiddenAsync') forbidden: string = '';

  validate(control: AbstractControl) {
    return forbiddenAsyncValidator(this.forbidden)(control);
  }
}
