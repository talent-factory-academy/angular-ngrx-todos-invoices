import { Component, OnDestroy } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-address',
  template: `
    Address:
    <form [formGroup]="form">
      <input type="text" formControlName="country" placeholder="Country">
      <input type="text" formControlName="city" placeholder="City">
      <input type="text" formControlName="street" placeholder="Street">
      <input type="text" formControlName="nr" placeholder="Number">
    </form>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AddressComponent,
      multi: true
    }
  ]
})
export class AddressComponent implements ControlValueAccessor, OnDestroy {

  form = this.fb.group({
    country: '',
    city: '',
    street: '',
    nr: ''
  });

  private sub = new Subscription();

  constructor(private fb: FormBuilder) {}

  writeValue(obj: any) {
    this.form.patchValue(obj);
  }

  setDisabledState(isDisabled: boolean) {
    isDisabled ? this.form.disable() : this.form.enable();
  }

  registerOnChange(fn: any) {
    this.sub.add(
      this.form.valueChanges.subscribe(x => fn(x))
    );
  }

  registerOnTouched(fn: any) {
    this.sub.add(
      this.form.valueChanges.subscribe(() => fn())
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
