import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  getUser(userId: string) {
    return this.http.get<any>('https://jsonplaceholder.typicode.com/users/' + userId);
  }

  getUsers() {
    return this.http.get<any[]>('https://jsonplaceholder.typicode.com/users/');
  }
}
