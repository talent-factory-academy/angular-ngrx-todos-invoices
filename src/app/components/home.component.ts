import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { inc, dec, reset } from '../store/counter/counter.actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  template: `
    <h1>Home</h1>
    {{ counter$ | async }}
    <app-counter
      [value]="counter$ | async"
      (increment)="inc()"
      (decrement)="dec()"
    ></app-counter>
  `,
})
export class HomeComponent {

  counter$ = this.store.pipe(
    map((state: any) => state.counter)
  )

  constructor(public store: Store) {}

  inc() {
    this.store.dispatch(inc());
  }

  dec() {
    this.store.dispatch(dec());
  }

  reset() {
    this.store.dispatch(reset({ value: 0 }))
  }
}
