import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Todo, TodoFilter } from '../models';
import {
  addTodoSuccess,
  getTodos,
  getTodosSuccess,
  removeTodoSuccess,
  setCompletedSuccess,
  setFilter,
} from './todos.actions';

export interface TodosState extends EntityState<Todo> {
  filter: TodoFilter,
  isLoading: boolean,
}

export const adapter: EntityAdapter<Todo> = createEntityAdapter<Todo>({
  selectId: todo => todo.id,
  sortComparer: (a: Todo, b: Todo) => a.text.localeCompare(b.text)
})

export const initialState: TodosState = adapter.getInitialState({
  filter: 'ALL',
  isLoading: false,
})

export const todosReducer = createReducer(
  initialState,
  on(addTodoSuccess, (state, action) => {
    return adapter.addOne(action.todo, state);
  }),
  on(removeTodoSuccess, (state, action) => {
    return adapter.removeOne(action.id, state);
  }),
  on(setFilter, (state, action) => ({
    ...state,
    filter: action.filter
  })),
  on(setCompletedSuccess, (state, action) => {
    return adapter.updateOne({
      id: action.todo.id,
      changes: action.todo
    }, state);
  }),
  on(getTodos, (state) => ({
    ...state,
    isLoading: true
  })),
  on(getTodosSuccess, (state, action) => {
    return adapter.setAll(action.todos, {
      ...state,
      isLoading: false
    })
  })
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
