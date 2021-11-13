import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { distinctUntilChanged, map, mapTo, startWith, take } from 'rxjs/operators';
import { InvoiceItem } from './models';
import { Store } from '@ngrx/store';
import { deleteInvoice, editInvoice, selectCurrentInvoice, selectUpdatedAt } from './store/invoices';
import { merge, Subscription } from 'rxjs';
import { selectClients } from './store/clients';

@Component({
  selector: 'app-invoice',
  template: `
    <div style="padding: 1rem; margin-bottom: 1rem; background: rgba(0,0,0,.05)">
      <h1 style="padding-bottom: 0; margin-bottom: 0;">Invoice</h1>
      <small [style.color]="statusColor$ | async">Updated at: {{ updatedAt$ | async }}</small>
    </div>

    <form [formGroup]="form" (ngSubmit)="saveInvoice()">

      <mat-form-field appearance="fill">
        <mat-label>Subject</mat-label>
        <input matInput type="text" formControlName="subject">
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Client</mat-label>
        <mat-select formControlName="clientId">
          <mat-option [value]="null">-</mat-option>
          <mat-option *ngFor="let client of (clients$ | async)" [value]="client.id">
            {{ client.name }}
          </mat-option>
        </mat-select>
      </mat-form-field>


      <div formArrayName="items">
        <div *ngFor="let item of items.controls; let i = index" [formGroupName]="i">

          <mat-form-field appearance="fill">
            <mat-label>Item</mat-label>
            <input matInput type="text" formControlName="text">
          </mat-form-field>

          <mat-form-field appearance="fill">
            <mat-label>Price</mat-label>
            <input matInput type="number" formControlName="price">
          </mat-form-field>

          <button mat-mini-fab color="warn" type="button" (click)="removeItem(i)">
            <mat-icon>remove</mat-icon>
          </button>

        </div>

        <button mat-mini-fab color="primary" type="button" (click)="addItem()">
          <mat-icon>add</mat-icon>
        </button>
      </div>

      <h2 style="padding-top: 1rem;">Total: €{{ total$ | async }}</h2>

      <button mat-raised-button color="primary" [disabled]="!form.valid">Save</button>
      <button mat-raised-button color="warn" type="button" (click)="deleteInvoice()">Delete</button>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvoiceComponent implements OnInit, OnDestroy {

  private sub: Subscription | null = null;

  clients$ = this.store.select(selectClients);
  updatedAt$ = this.store.select(selectUpdatedAt);

  form = this.fb.group({
    clientId: [null, Validators.required],
    subject: ['', Validators.required],
    items: this.fb.array([])
  })

  total$ = this.form.valueChanges.pipe(
    startWith(this.form.value),
    map(form => this.calculateTotal(form.items))
  )

  currentInvoice$ = this.store.select(selectCurrentInvoice).pipe(
    distinctUntilChanged((a, b) => a?.id === b?.id),
  )

  isUpdated$ = merge(
    this.form.valueChanges.pipe(mapTo(false)),
    this.updatedAt$.pipe(mapTo(true)),
    this.currentInvoice$.pipe(mapTo(true))
  ).pipe(
    distinctUntilChanged()
  )

  statusColor$ = this.isUpdated$.pipe(
    map(isUpdated => isUpdated ? 'green' : 'red')
  )

  get items() {
    return this.form.get('items')! as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) {}

  ngOnInit() {
    this.sub = this.currentInvoice$.subscribe(invoice => {
      if (invoice) {
        this.items.clear();

        invoice.items.forEach(() => {
          this.items.push(this.createItem());
        });

        this.form.reset(invoice);
      }
    })
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  createItem() {
    return this.fb.group({
      text: ['', Validators.required],
      price: [null, Validators.required]
    });
  }

  addItem() {
    this.items.push(this.createItem());
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }

  saveInvoice() {
    if (this.form.valid) {
      this.store.dispatch(editInvoice({
        invoice: {
          ...this.form.value,
          total: this.calculateTotal(this.form.value.items)
        }
      }));
    }
  }

  deleteInvoice() {
    this.currentInvoice$.pipe(
      take(1)
    ).subscribe(invoice => {
      if (invoice) {
        this.store.dispatch(deleteInvoice({ id: invoice.id }))
      }
    })
  }

  calculateTotal(items: InvoiceItem[]) {
    return items.reduce((total: number, item: InvoiceItem) => total + item.price, 0)
  }
}
