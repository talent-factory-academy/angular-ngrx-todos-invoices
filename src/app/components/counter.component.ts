import { Component, forwardRef, HostBinding, Injector, Input, EventEmitter, Optional, Output, Self } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor, FormControlDirective, FormControlName,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR, NgControl, NgModel,
  ValidationErrors,
  Validator
} from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-counter',
  template: `
    <button (click)="inc()">+</button>
    <button (click)="dec()">-</button>
    {{ value$ | async }}
    isValid: {{ ngControl?.valid }}
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CounterComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: CounterComponent,
      multi: true
    }
  ]
})
export class CounterComponent implements ControlValueAccessor, Validator {

  @Input() set value(x: number) {
    this.value$.next(x);
  }

  @Output() increment = new EventEmitter<void>();
  @Output() decrement = new EventEmitter<void>();

  value$ = new BehaviorSubject<number>(0);
  sub = new Subscription();
  isDisabled = false;
  ngControl: NgControl | null = null;

  @HostBinding('style.opacity')
  get opacity() {
    return this.isDisabled ? 0.5 : 1;
  }

  constructor(
    private injector: Injector
  ) {}

  ngOnInit() {
    this.ngControl = this.injector.get(NgControl);
  }

  inc() {
    if (!this.isDisabled) {
      this.value$.next(this.value$.getValue() + 1);
      this.increment.emit();
    }
  }

  dec() {
    if (!this.isDisabled) {
      this.value$.next(this.value$.getValue() - 1);
      this.decrement.emit();
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  writeValue(count: any) {
    this.value$.next(+count);
  }

  registerOnChange(fn: any) {
    this.sub.add(this.value$.subscribe(x => fn(x)))
  }

  registerOnTouched(fn: any) {
    this.sub.add(this.value$.subscribe(() => fn()))
  }

  setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return control.value === 2
      ? { NoTwoValidator: true }
      : null;
  }
}
