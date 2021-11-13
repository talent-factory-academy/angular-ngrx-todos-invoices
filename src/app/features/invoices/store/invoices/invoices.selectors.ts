import { createSelector } from '@ngrx/store';
import { selectRouteParam } from '../../../../store/router/router.selectors';
import { selectFeatureInvoice } from '../index';

export const selectInvoicesState = createSelector(
  selectFeatureInvoice,
  state => state.invoices
)

export const selectInvoices = createSelector(
  selectInvoicesState,
  state => state.invoices
);

export const selectLoading = createSelector(
  selectInvoicesState,
  state => state.loading
);

export const selectUpdatedAt = createSelector(
  selectInvoicesState,
  state => state.updatedAt
);

export const selectCurrentInvoice = createSelector(
  selectInvoices,
  selectRouteParam('id'),
  (invoices, id) => invoices.find(invoice => invoice.id === id)
)
