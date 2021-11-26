import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';

export const myValidator = (control: AbstractControl): ValidationErrors | null => {
  return control.value?.country === 'italia'
    ? { error: true }
    : null;
}

@Component({
  selector: 'app-form',
  template: `
    <form [formGroup]="form">
      <input type="text" formControlName="name" placeholder="Name">
      <input type="text" formControlName="surname" placeholder="Surname">
      <app-address formControlName="address"></app-address>
      <app-counter formControlName="counter"></app-counter>
    </form>

    <br>
    {{ form.value | json }}

    {{ form.status }}
    <br>
  `
})
export class FormComponent {

  form = this.fb.group({
    name: ['', [], []],
    surname: [''],
    counter: [0, [Validators.max(5)]],
    address: [null]
  });

  constructor(
    private fb: FormBuilder,
  ) {}
}
