import { createAction, props } from '@ngrx/store';

export const inc = createAction('[Counter] Increment');
export const dec = createAction('[Counter] Decrement');
export const reset = createAction('[Counter] Reset',
  props<{ value: number }>()
);
