import { createReducer, on } from '@ngrx/store';
import { Todo, TodoFilter } from '../models';
import { addTodo, getTodos, getTodosSuccess, removeTodo, setCompleted, setFilter } from './todos.actions';

export interface TodosState {
  todos: Todo[],
  filter: TodoFilter,
}

export const initialState: TodosState = {
  todos: [],
  filter: 'ALL'
}

export const todosReducer = createReducer(
  initialState,
  on(addTodo, (state, action) => {
    const newTodo: Todo = {
      id: ''+ Math.random(),
      text: action.text,
      completed: false
    }
    return {
      ...state,
      todos: [...state.todos, newTodo]
    }
  }),
  on(removeTodo, (state, action) => ({
    ...state,
    todos: state.todos.filter(todo =>
      todo.id !== action.id
    )
  })),
  on(setFilter, (state, action) => ({
    ...state,
    filter: action.filter
  })),
  on(setCompleted, (state, action) => {
    return {
      ...state,
      todos: state.todos.map(todo => {
        if (todo.id !== action.id) return todo;
        return {
          ...todo,
          completed: action.isComplete
        }
      })
    }
  }),
  on(getTodos, (state, action) => state),
  on(getTodosSuccess, (state, action) => ({
    ...state,
    todos: action.todos
  })),
)
