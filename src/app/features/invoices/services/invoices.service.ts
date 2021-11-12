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
    return this.http.get(`${environment.apiUrl}/invoices`);
  }

  deleteInvoice(id: string) {
    return this.http.delete(`${environment.apiUrl}/invoices/${id}`);
  }

  addInvoice(invoice: Invoice) {
    return this.http.post(`${environment.apiUrl}/invoices`, invoice);
  }

  editInvoice(invoice: Invoice) {
    return this.http.patch(`${environment.apiUrl}/invoices/${invoice.id}`, invoice);
  }
}
