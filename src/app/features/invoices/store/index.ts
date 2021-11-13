import { createFeatureSelector } from '@ngrx/store';
import { InvoicesState } from './invoices';
import { ClientsState } from './clients';

export const selectFeatureInvoice = createFeatureSelector<{
  invoices: InvoicesState,
  clients: ClientsState
}>('invoices');
