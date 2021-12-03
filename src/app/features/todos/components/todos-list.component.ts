import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../models';

@Component({
  selector: 'app-todos-list',
  template: `
    <mat-list dense>
      <div mat-subheader>Todos</div>
      <mat-list-item *ngFor="let todo of todos">
        <mat-checkbox
          [ngModel]="todo.completed"
          (ngModelChange)="setCompleted.emit({
            isComplete: $event,
            id: todo.id
           })"
          style="margin-right: 1rem;"
        ></mat-checkbox>
        {{todo.text}}
        <button mat-icon-button color="primary" (click)="removeTodo.emit(todo.id)">
          <mat-icon>delete</mat-icon>
        </button>
      </mat-list-item>
    </mat-list>
  `
})
export class TodosListComponent {
  @Input() todos: Todo[] = [];
  @Output() setCompleted = new EventEmitter<{ isComplete: boolean, id: string }>();
  @Output() removeTodo = new EventEmitter<string>();
}
