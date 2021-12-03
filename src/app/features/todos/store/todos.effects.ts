import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import * as TodoActions from './todos.actions';
import { TodosService } from '../services/todos.service';
import {
  catchError,
  concatMap,
  map,
  mergeMap,
  switchMap,
} from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectTodos } from './todos.selectors';

@Injectable()
export class TodosEffects {

  constructor(
    private actions: Actions,
    private todosService: TodosService,
    private store: Store
  ) {}

  getTodos$ = createEffect(() => this.actions.pipe(
    ofType(TodoActions.getTodos),
    switchMap(() => this.todosService.getTodos().pipe(
      map(todos => TodoActions.getTodosSuccess({ todos })),
      catchError(() => of(TodoActions.getTodosFail()))
    )),
  ));

  addTodo$ = createEffect(() => this.actions.pipe(
    ofType(TodoActions.addTodo),
    concatMap(action => {
      const newTodo = {
        text: action.text,
        completed: false
      }
      return this.todosService.addTodo(newTodo).pipe(
        map(todo => TodoActions.addTodoSuccess({ todo })),
        catchError(() => of(TodoActions.addTodoFail()))
      )
    })
  ))

  changeFilterOnSuccess$ = createEffect(() => this.actions.pipe(
    ofType(TodoActions.addTodoSuccess),
    map(() => TodoActions.setFilter({ filter: 'ALL' }))
  ))

  removeTodo$ = createEffect(() => this.actions.pipe(
    ofType(TodoActions.removeTodo),
    mergeMap(({ id }) => this.todosService.deleteTodo(id).pipe(
      map(() => TodoActions.removeTodoSuccess({ id })),
      catchError(() => of(TodoActions.removeTodoFail()))
    ))
  ))

  setCompleted$ = createEffect(() => this.actions.pipe(
    ofType(TodoActions.setCompleted),
    concatLatestFrom(() => this.store.select(selectTodos)),
    mergeMap(([action, todos]) => {
      const todo = todos.find(t => t.id === action.id)!;
      return this.todosService.patchTodo({
        ...todo,
        completed: action.isComplete
      }).pipe(
        map(todo => TodoActions.setCompletedSuccess({ todo })),
        catchError(() => of(TodoActions.setCompletedFail()))
      )
    })
  ))
}
