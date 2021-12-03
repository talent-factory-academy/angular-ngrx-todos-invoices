import { createAction, props } from '@ngrx/store';
import { TodoFilter, Todo } from '../models';

/**
 * Fetching
 */
export const getTodos = createAction(
  '[Todos] Get All'
);

export const getTodosSuccess = createAction(
  '[Todos] Get Success',
  props<{ todos: Todo[] }>()
)

export const getTodosFail = createAction(
  '[Todos] Get Fail',
)

/**
 * Adding
 */
export const addTodo = createAction(
  '[Todos] Add',
  props<{ text: string }>()
);

export const addTodoSuccess = createAction(
  '[Todos] Add Success',
  props<{ todo: Todo }>()
);

export const addTodoFail = createAction(
  '[Todos] Add Fail',
);

/**
 * Removing
 */
export const removeTodo = createAction(
  '[Todos] Remove',
  props<{ id: string }>()
)

export const removeTodoSuccess = createAction(
  '[Todos] Remove Success',
  props<{ id: string }>()
)

export const removeTodoFail = createAction(
  '[Todos] Remove Fail',
)

/**
 * Toggle Complete
 */
export const setCompleted = createAction(
  '[Todos] Set Completed',
  props<{ isComplete: boolean, id: string }>()
)

export const setCompletedSuccess = createAction(
  '[Todos] Set Completed Success',
  props<{ todo: Todo }>()
)

export const setCompletedFail = createAction(
  '[Todos] Set Completed Fail',
)

/**
 * UI
 */
export const setFilter = createAction(
  '[Todos] Set Filter',
  props<{ filter: TodoFilter }>()
)
