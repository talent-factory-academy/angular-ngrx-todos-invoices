import { createFeatureSelector, createSelector } from '@ngrx/store';
import { featureKey, InvoicesState } from './invoices.reducer';

export const getInvoicesState = createFeatureSelector<InvoicesState>(featureKey);

export const getInvoicesList = createSelector(
  getInvoicesState,
  state => state.invoices
);

export const getLoading = createSelector(
  getInvoicesState,
  state => state.loading
);
