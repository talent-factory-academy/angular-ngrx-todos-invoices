import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
import { Directive, Input } from '@angular/core';

export function forbiddenValidator(name: any): ValidatorFn {
  return (control: AbstractControl) => {
    return control?.value === name
      ? { forbidden: true }
      : null;
  }
}

@Directive({
  selector: '[forbidden]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ForbiddenValidator,
      multi: true
    }
  ]
})
export class ForbiddenValidator implements Validator {

  @Input() forbidden: string = '';

  validate(control: AbstractControl): ValidationErrors | null {
    return forbiddenValidator(this.forbidden)(control);
  }
}
