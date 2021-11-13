import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { go, forward, back } from './router.actions';

@Injectable()
export class RouterEffects {

  goEffect$ = createEffect(() => this.actions.pipe(
      ofType(go),
      tap(({ path, extras }) => {
        this.router.navigate(path, extras);
      })
    ), { dispatch: false }
  );

  backEffect$ = createEffect(() => this.actions.pipe(
      ofType(back),
      tap(action => this.location.back()),
    ), { dispatch: false }
  );

  forwardEffect$ = createEffect(() => this.actions.pipe(
      ofType(forward),
      tap(action => this.location.forward()),
    ), { dispatch: false }
  );

  constructor(
    private actions: Actions,
    private router: Router,
    private location: Location
  ) {}
}
