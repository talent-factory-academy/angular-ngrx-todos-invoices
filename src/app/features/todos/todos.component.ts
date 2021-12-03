import { Component, OnInit } from '@angular/core';
import { TodoFilter } from './models';
import { Store } from '@ngrx/store';
import { selectFilter, selectFilteredTodos, selectIsLoading } from './store/todos.selectors';
import * as Actions from './store/todos.actions';

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
    <p *ngIf="isLoading$ | async">Loading...</p>
  `,
  styles: [`
    :host, app-todos-form, app-todos-filter {
      display: block;
      margin: 1rem;
    }
  `]
})
export class TodosComponent implements OnInit {

  todos$ = this.store.select(selectFilteredTodos);
  filter$ = this.store.select(selectFilter);
  isLoading$ = this.store.select(selectIsLoading);

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(Actions.getTodos());
  }

  addTodo(text: string) {
    this.store.dispatch(Actions.addTodo({ text }))
  }

  removeTodo(id: string) {
    this.store.dispatch(Actions.removeTodo({ id }))
  }

  setFilter(filter: TodoFilter) {
    this.store.dispatch(Actions.setFilter({ filter }));
  }

  setCompleted({ isComplete, id }: { isComplete: boolean, id: string }) {
    this.store.dispatch(Actions.setCompleted({ isComplete, id }))
  }
}
