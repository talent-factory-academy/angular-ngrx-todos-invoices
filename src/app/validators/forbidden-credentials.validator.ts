import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { Directive } from '@angular/core';

export function forbiddenCredentialsValidator(control: AbstractControl): ValidationErrors | null {
  const name = control?.get('name')?.value;
  const surname = control?.get('surname')?.value;

  if (name === 'michele' && surname === 'stieven') {
    return {
      forbiddenCredentials: true
    }
  }
  return null;
}

@Directive({
  selector: '[forbiddenCredentials]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ForbiddenCredentialsValidator,
      multi: true
    }
  ]
})
export class ForbiddenCredentialsValidator implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return forbiddenCredentialsValidator(control);
  }
}
