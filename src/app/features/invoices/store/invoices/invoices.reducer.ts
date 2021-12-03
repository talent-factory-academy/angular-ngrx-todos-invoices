import { Invoice } from '../../models';
import { createReducer, on } from '@ngrx/store';
import {
  addInvoiceSuccess,
  deleteInvoiceSuccess, editInvoiceSuccess,
  loadInvoices,
  loadInvoicesFail,
  loadInvoicesSuccess
} from './invoices.actions';

export interface InvoicesState {
  invoices: Invoice[];
  loading: boolean;
  updatedAt: string;
}

export const initialState: InvoicesState = {
  invoices: [],
  loading: false,
  updatedAt: '',
}

export const invoicesReducer = createReducer(
  initialState,
  on(loadInvoices, (state) => ({ ...state, loading: true })),
  on(loadInvoicesSuccess, (state, action) => ({
    ...state,
    loading: false,
    invoices: action.invoices
  })),
  on(loadInvoicesFail, (state) => ({ ...state, loading: false })),
  on(addInvoiceSuccess, (state, action) => ({
    ...state,
    invoices: [...state.invoices, action.invoice]
  })),
  on(deleteInvoiceSuccess, (state, action) => ({
    ...state,
    invoices: state.invoices.filter(invoice => invoice.id !== action.id)
  })),
  on(editInvoiceSuccess, (state, action) => ({
    ...state,
    updatedAt: action.updatedAt,
    invoices: state.invoices.map(invoice => {
      if (invoice.id === action.invoice.id) return action.invoice;
      return invoice;
    })
  }))
)
