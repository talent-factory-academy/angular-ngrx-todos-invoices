import { createAction, props } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export const go = createAction(
  '[ROUTER] Go',
  props<{ path: any[], extras?: NavigationExtras }>()
);

export const back = createAction('[ROUTER] Back');
export const forward = createAction('[ROUTER] Forward');
