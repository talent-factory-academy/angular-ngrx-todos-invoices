import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { InvoicesService } from './services/invoices.service';
import { ClientsService } from './services/clients.service';
import { BehaviorSubject } from 'rxjs';
import { Client, Invoice } from './models';

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

  // TODO
  invoices$ = new BehaviorSubject<Invoice[]>([]);

  // TODO
  clients$ = new BehaviorSubject<Client[]>([]);

  constructor(
    private invoicesService: InvoicesService,
    private clientsService: ClientsService
  ) {}

  // TODO
  ngOnInit() {
    this.invoicesService.loadInvoices().subscribe(invoices => {
      this.invoices$.next(invoices);
    })

    this.clientsService.loadClients().subscribe(clients => {
      this.clients$.next(clients);
    })
  }

  // TODO
  addInvoice() {

  }
}
