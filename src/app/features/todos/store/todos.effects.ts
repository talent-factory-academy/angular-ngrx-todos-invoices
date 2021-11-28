import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { getTodos, getTodosFail, getTodosSuccess } from './todos.actions';
import { TodosService } from '../services/todos.service';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

@Injectable()
export class TodosEffects {

  constructor(
    private actions: Actions,
    private todosService: TodosService,
  ) {
  }

  getTodos$ = createEffect(() => this.actions.pipe(
    ofType(getTodos),
    switchMap(() => this.todosService.getTodos().pipe(
      map(todos => getTodosSuccess({ todos })),
      catchError(() => of(getTodosFail()))
    )),
  ));
}
