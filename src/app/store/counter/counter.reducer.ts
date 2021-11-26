import { inc, dec, reset } from './counter.actions';
import { createReducer, on } from '@ngrx/store';

export type CounterState = number;

export const initialState: CounterState = 0;

export const counterReducer = createReducer(
  initialState,
  on(inc, (state) => state + 1),
  on(dec, (state) => state < 1 ? state : state - 1),
  on(reset, (state, action) => action.value)
)
