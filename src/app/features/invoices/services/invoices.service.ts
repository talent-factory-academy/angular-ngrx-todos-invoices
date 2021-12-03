import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Invoice } from '../models';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {

  constructor(private http: HttpClient) {}

  loadInvoices() {
    return this.http.get<Invoice[]>(`${environment.apiUrl}/invoices`);
  }

  deleteInvoice(id: string) {
    return this.http.delete(`${environment.apiUrl}/invoices/${id}`);
  }

  addInvoice(invoice: Omit<Invoice, 'id'>) {
    return this.http.post<Invoice>(`${environment.apiUrl}/invoices`, invoice);
  }

  editInvoice(invoice: Partial<Invoice>) {
    return this.http.patch<Invoice>(`${environment.apiUrl}/invoices/${invoice.id}`, invoice);
  }
}
