import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosComponent } from './todos.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { StoreModule } from '@ngrx/store';
import { todosFeature } from './store/todos.reducer';
import { TodosFilterComponent } from './components/todos-filter.component';
import { TodosFormComponent } from './components/todos-form.component';
import { TodosListComponent } from './components/todos-list.component';
import { EffectsModule } from '@ngrx/effects';
import { TodosEffects } from './store/todos.effects';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    RouterModule.forChild([
      {
        path: '',
        component: TodosComponent
      }
    ]),
    StoreModule.forFeature(todosFeature),
    EffectsModule.forFeature([TodosEffects])
  ],
  declarations: [
    TodosComponent,
    TodosFormComponent,
    TodosListComponent,
    TodosFilterComponent
  ]
})
export class TodosModule {}
