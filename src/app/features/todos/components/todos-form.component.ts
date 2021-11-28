import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-todos-form',
  template: `
    <mat-form-field appearance="fill">
      <mat-label>Add Todo</mat-label>
      <input
        type="text"
        matInput
        [formControl]="newTodo"
        (keyup.enter)="submit()"
      >
    </mat-form-field>
  `
})
export class TodosFormComponent {
  newTodo = new FormControl('');

  @Output() addTodo = new EventEmitter<string>();

  submit() {
    if (this.newTodo.value) {
      this.addTodo.emit(this.newTodo.value);
      this.newTodo.reset();
    }
  }
}
