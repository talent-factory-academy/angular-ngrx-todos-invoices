import { createAction, props } from '@ngrx/store';
import { TodoFilter, Todo } from '../models';

export const getTodos = createAction(
  '[Todos] Get Todos'
);

export const getTodosSuccess = createAction(
  '[Todos] Get Todos Success',
  props<{ todos: Todo[] }>()
)

export const getTodosFail = createAction(
  '[Todos] Get Todos Fail',
)

export const addTodo = createAction(
  '[Todos] Add Todo',
  props<{ text: string }>()
);

export const removeTodo = createAction(
  '[Todos] Remove Todo',
  props<{ id: string }>()
)

export const setFilter = createAction(
  '[Todos] Set Filter',
  props<{ filter: TodoFilter }>()
)

export const setCompleted = createAction(
  '[Todos] Set Completed',
  props<{ isComplete: boolean, id: string }>()
)
