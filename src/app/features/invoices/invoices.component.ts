import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { addInvoice, deleteInvoice, loadInvoices, selectInvoices } from './store/invoices';
import { loadClients } from './store/clients';

@Component({
  selector: 'app-invoices',
  template: `
    <div class="container">
      <div class="column" style="flex: 1">
        <mat-nav-list *ngIf="invoices$ | async as invoices">
          <a
            mat-list-item
            *ngFor="let invoice of invoices"
            [routerLink]="'/invoices/' + invoice.id"
          > {{ invoice.subject || 'New invoice' }} </a>
        </mat-nav-list>
        <button mat-mini-fab color="primary" (click)="addInvoice()">
          <mat-icon>add</mat-icon>
        </button>
      </div>
      <div class="column" style="flex: 3">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    .container {
      display: flex;
    }
    .column {
      padding: 1rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvoicesComponent implements OnInit {

  invoices$ = this.store.select(selectInvoices);

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(loadInvoices());
    this.store.dispatch(loadClients());
  }

  addInvoice() {
    this.store.dispatch(addInvoice())
  }
}
