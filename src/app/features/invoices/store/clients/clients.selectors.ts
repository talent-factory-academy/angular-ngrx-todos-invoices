import { createSelector } from '@ngrx/store';
import { selectFeatureInvoice } from '../index';

export const selectClientsState = createSelector(
  selectFeatureInvoice,
  state => state.clients
)

export const selectClients = createSelector(
  selectClientsState,
  state => state.clients
);
