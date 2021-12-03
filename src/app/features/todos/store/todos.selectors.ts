import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectAll, TodosState } from './todos.reducer';

export const selectTodosState = createFeatureSelector<TodosState>('todos');

export const selectTodos = createSelector(
  selectTodosState,
  selectAll
);

export const selectFilter = createSelector(
  selectTodosState,
  (state) => state.filter
)

export const selectIsLoading = createSelector(
  selectTodosState,
  (state) => state.isLoading
)

export const selectFilteredTodos = createSelector(
  selectTodos,
  selectFilter,
  (todos, filter) => {
    switch (filter) {
      case 'COMPLETED':
        return todos.filter(todo => todo.completed);
      case 'ACTIVE':
        return todos.filter(todo => !todo.completed);
    }
    return todos;
  }
)
