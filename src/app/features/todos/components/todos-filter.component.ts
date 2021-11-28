import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TodoFilter } from '../models';

@Component({
  selector: 'app-todos-filter',
  template: `
    <mat-form-field appearance="fill">
      <mat-label>Show</mat-label>
      <mat-select
        [value]="filter"
        (valueChange)="setFilter.emit($event)"
      >
        <mat-option value="ALL">All</mat-option>
        <mat-option value="COMPLETED">Completed</mat-option>
        <mat-option value="ACTIVE">Active</mat-option>
      </mat-select>
    </mat-form-field>
  `
})
export class TodosFilterComponent {
  @Input() filter!: TodoFilter;
  @Output() setFilter = new EventEmitter<TodoFilter>();
}
