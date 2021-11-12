import { Invoice } from '../../models';
import { createReducer, on } from '@ngrx/store';
import {
  addInvoiceSuccess, deleteInvoiceSuccess,
  editInvoiceSuccess,
  loadInvoices,
  loadInvoicesFail,
  loadInvoicesSuccess
} from './invoices.actions';

export const featureKey = 'invoices';

export interface InvoicesState {
  invoices: Invoice[];
  loading: boolean;
}

export const initialState: InvoicesState = {
  invoices: [],
  loading: false
}

export const invoicesReducer = createReducer(
  initialState,
  on(loadInvoices, (state) => ({ ...state, loading: true })),
  on(loadInvoicesSuccess, (state, action) => ({ ...state, invoices: action.invoices, loading: false })),
  on(loadInvoicesFail, (state) => ({ ...state, loading: false })),
  on(addInvoiceSuccess, (state, action) => ({ ...state, invoices: [...state.invoices, action.invoice] })),
  on(editInvoiceSuccess, (state, action) => ({ ...state, invoices: state.invoices.map(invoice => {
      if (invoice.id === action.invoice.id) {
        return action.invoice;
      }
      return invoice;
    })
  })),
  on(deleteInvoiceSuccess, (state, action) => ({ ...state, invoices: state.invoices.filter(invoice => invoice.id !== action.id) }))
)
