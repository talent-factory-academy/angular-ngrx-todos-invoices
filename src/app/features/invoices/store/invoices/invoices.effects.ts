import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, EffectNotification, ofType, OnRunEffects } from '@ngrx/effects';
import { InvoicesService } from '../../services/invoices.service';
import * as InvoicesActions from './invoices.actions';
import { catchError, exhaustMap, map, mergeMap, switchMap, takeUntil } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Invoice } from '../../models';
import { v4 as uuid } from 'uuid';
import { selectCurrentInvoice } from './invoices.selectors';
import { Store } from '@ngrx/store';
import { deleteInvoice, deleteInvoiceSuccess, startInvoices, stopInvoices } from './invoices.actions';
import { selectRouteParam } from '../../../../store/router/router.selectors';
import { go } from '../../../../store/router/router.actions';

@Injectable()
export class InvoicesEffects implements OnRunEffects {

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
  ))

  addInvoice$ = createEffect(() => this.actions.pipe(
    ofType(InvoicesActions.addInvoice),
    mergeMap(() => {
      const newInvoice: Invoice = {
        id: uuid(),
        subject: '',
        total: 0,
        items: []
      };
      return this.invoicesService.addInvoice(newInvoice).pipe(
        map(invoice => InvoicesActions.addInvoiceSuccess({ invoice })),
        catchError(() => of(InvoicesActions.addInvoiceFail()))
      )
    })
  ))

  editInvoice$ = createEffect(() => this.actions.pipe(
    ofType(InvoicesActions.editInvoice),
    concatLatestFrom(() => this.store.select(selectCurrentInvoice)),
    switchMap(([action, invoice]) => {
      return this.invoicesService.editInvoice({
        ...invoice,
        ...action.invoice
      } as Invoice).pipe(
        map(invoice => {
          const now = new Date();
          const updatedAt = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
          return InvoicesActions.editInvoiceSuccess({ invoice, updatedAt })
        }),
        catchError(() => of(InvoicesActions.editInvoiceFail()))
      )
    })
  ))

  deleteInvoice$ = createEffect(() => this.actions.pipe(
    ofType(deleteInvoice),
    mergeMap(({ id }) => this.invoicesService.deleteInvoice(id).pipe(
      map(() => InvoicesActions.deleteInvoiceSuccess({ id })),
      catchError(() => of(InvoicesActions.deleteInvoiceFail))
    ))
  ))

  deleteInvoiceNavigation$ = createEffect(() => this.actions.pipe(
    ofType(deleteInvoiceSuccess),
    map(() => go({ path: ['invoices'] })),
  ))

  // Versione aggiornata: naviga solo se in quel momento
  // ci troviamo nella rotta con quell'id, utile se
  // predisponiamo un tasto delete anche fuori dalla fattura
  // deleteInvoiceNavigation$ = createEffect(() => this.actions.pipe(
  //   ofType(deleteInvoiceSuccess),
  //   concatLatestFrom(() => this.store.select(selectRouteParam('id'))),
  //   switchMap(([action, id]) => {
  //     if (id === action.id) {
  //       return of(go({ path: ['invoices'] }))
  //     }
  //     return EMPTY;
  //   }),
  // ))

  /**
   * Inizia gli effetti quando viene lanciata "startInvoices",
   * fermali tutti quando viene lanciata "stopInvoices"
   */
  ngrxOnRunEffects(resolvedEffects$: Observable<EffectNotification>) {
    return this.actions.pipe(
      ofType(startInvoices),
      exhaustMap(() =>
        resolvedEffects$.pipe(
          takeUntil(this.actions.pipe(ofType(stopInvoices)))
        )
      )
    );
  }
}
