import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Client } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http: HttpClient) {}

  loadClients() {
    return this.http.get<Client[]>(`${environment.apiUrl}/clients`);
  }

  deleteClient(id: string) {
    return this.http.delete(`${environment.apiUrl}/clients/${id}`);
  }

  addClient(client: Partial<Client>) {
    return this.http.post<Client>(`${environment.apiUrl}/clients`, client);
  }
}
