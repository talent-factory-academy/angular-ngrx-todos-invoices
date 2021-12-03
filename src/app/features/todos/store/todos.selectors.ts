import { createSelector } from '@ngrx/store';
import { adapter, todosFeature } from './todos.reducer';

// Feature selectors
export const {
  selectTodosState,
  selectFilter,
  selectIsLoading,
} = todosFeature;

// Entity selectors
export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const selectTodos = createSelector(
  selectTodosState,
  selectAll
);

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
