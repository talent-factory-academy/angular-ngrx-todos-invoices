import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../models';
import { environment as env } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(private http: HttpClient) {}

  getTodos() {
    return this.http.get<Todo[]>(`${env.apiUrl}/todos`);
  }

  deleteTodo(id: string) {
    return this.http.delete(`${env.apiUrl}/todos/${id}`);
  }

  addTodo(todo: Omit<Todo, 'id'>) {
    return this.http.post<Todo>(`${env.apiUrl}/todos`, todo);
  }

  patchTodo(todo: Todo) {
    return this.http.patch<Todo>(`${env.apiUrl}/todos/${todo.id}`, todo);
  }
}
