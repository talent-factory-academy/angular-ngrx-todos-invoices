import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import * as InvoicesActions from './invoices.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { InvoicesService } from '../../services/invoices.service';
import { EMPTY, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCurrentInvoice } from './invoices.selectors';
import { Invoice } from '../../models';
import { v4 as uuid } from 'uuid';
import { deleteInvoiceSuccess } from './invoices.actions';
import { selectRouteParam } from '../../../../store/router/router.selectors';
import { go } from '../../../../store/router/router.actions';

@Injectable()
export class InvoicesEffects {

  constructor(
    private actions: Actions,
    private invoicesService: InvoicesService,
    private store: Store
  ) {}

  loadInvoices$ = createEffect(() => this.actions.pipe(
    ofType(InvoicesActions.loadInvoices),
    switchMap(() => this.invoicesService.loadInvoices().pipe(
      map(invoices => InvoicesActions.loadInvoicesSuccess({ invoices })),
      catchError(() => of(InvoicesActions.loadInvoicesFail()))
    ))
  ));

  addInvoice$ = createEffect(() => this.actions.pipe(
    ofType(InvoicesActions.addInvoice),
    switchMap(() => this.invoicesService.addInvoice({ id: uuid(), subject: '', total: 0, items: [] }).pipe(
      map(invoice => InvoicesActions.addInvoiceSuccess({ invoice })),
      catchError(() => of(InvoicesActions.addInvoiceFail()))
    ))
  ));

  editInvoice$ = createEffect(() => this.actions.pipe(
    ofType(InvoicesActions.editInvoice),
    concatLatestFrom(() => this.store.select(selectCurrentInvoice)),
    switchMap(([action, invoice]) => {
      return this.invoicesService.editInvoice({
        ...invoice,
        ...action.invoice
      } as Invoice).pipe(
        map(finalInvoice => {
          const now = new Date();
          const updatedAt = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
          return InvoicesActions.editInvoiceSuccess({ invoice: finalInvoice, updatedAt });
        }),
        catchError(() => of(InvoicesActions.editInvoiceFail()))
      )
    })
  ));

  deleteInvoice$ = createEffect(() => this.actions.pipe(
    ofType(InvoicesActions.deleteInvoice),
    switchMap(({ id }) => this.invoicesService.deleteInvoice(id).pipe(
      map(() => InvoicesActions.deleteInvoiceSuccess({ id })),
      catchError(() => of(InvoicesActions.deleteInvoiceFail()))
    ))
  ));

  deleteInvoiceNavigation$ = createEffect(() => this.actions.pipe(
    ofType(deleteInvoiceSuccess),
    concatLatestFrom(() => this.store.select(selectRouteParam('id'))),
    switchMap(([action, routeId]) => {
      if (routeId && routeId.includes(action.id)) {
        return of(go({
          path: ['invoices']
        }))
      }
      return EMPTY;
    })
  ))
}
