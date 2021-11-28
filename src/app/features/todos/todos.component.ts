import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Todo, TodoFilter } from './models';
import { Store } from '@ngrx/store';
import { selectFilter, selectFilteredTodos } from './store/todos.selectors';
import { addTodo, getTodos, removeTodo, setCompleted, setFilter } from './store/todos.actions';

@Component({
  selector: 'app-todos',
  template: `
    <app-todos-form
      (addTodo)="addTodo($event)"
    ></app-todos-form>
    <app-todos-filter
      [filter]="(filter$ | async) ?? 'ALL'"
      (setFilter)="setFilter($event)"
    ></app-todos-filter>
    <app-todos-list
      [todos]="(todos$ | async) ?? []"
      (removeTodo)="removeTodo($event)"
      (setCompleted)="setCompleted($event)"
    ></app-todos-list>
  `,
  styles: [`
    :host {
      display: block;
      margin: 1rem;
    }
    mat-form-field {
      width: 100%;
    }
  `]
})
export class TodosComponent implements OnInit {

  todos$ = this.store.select(selectFilteredTodos);
  filter$ = this.store.select(selectFilter);

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(getTodos());
  }

  addTodo(text: string) {
    this.store.dispatch(addTodo({ text }))
  }

  removeTodo(id: string) {
    this.store.dispatch(removeTodo({ id }))
  }

  setFilter(filter: TodoFilter) {
    this.store.dispatch(setFilter({ filter }));
  }

  setCompleted({ isComplete, id }: { isComplete: boolean, id: string }) {
    this.store.dispatch(setCompleted({ isComplete, id }))
  }
}
