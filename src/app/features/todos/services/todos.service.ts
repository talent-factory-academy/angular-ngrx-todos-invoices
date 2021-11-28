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
}
