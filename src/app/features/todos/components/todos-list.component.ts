import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../models';

@Component({
  selector: 'app-todos-list',
  template: `
    <ul>
      <li *ngFor="let todo of todos">
        {{ todo.text }}
        <mat-checkbox
          [ngModel]="todo.completed"
          (ngModelChange)="setCompleted.emit({
            isComplete: $event,
            id: todo.id
           })"
        >Completed</mat-checkbox>
        <button (click)="removeTodo.emit(todo.id)">Remove</button>
      </li>
    </ul>
  `
})
export class TodosListComponent {

  @Input() todos: Todo[] = [];
  @Output() setCompleted = new EventEmitter<{ isComplete: boolean, id: string }>();
  @Output() removeTodo = new EventEmitter<string>();
}
