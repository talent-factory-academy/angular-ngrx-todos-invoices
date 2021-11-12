import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Invoice } from '../models';

@Component({
  selector: 'app-invoices-list',
  template: `
    <ul>
      <li *ngFor="let invoice of invoices">
        {{ invoice.invoiceNumber }} - {{ invoice.subject }}
        <a [routerLink]="'/invoices/' + invoice.id">See</a>
        <button (click)="deleteInvoice.emit(invoice.id)">Delete</button>
      </li>
    </ul>
  `
})
export class InvoicesListComponent {
  @Input() invoices: Invoice[] = [];
  @Output() deleteInvoice = new EventEmitter<string>();
}
