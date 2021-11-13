import { createAction, props } from '@ngrx/store';
import { Invoice } from '../../models';

/**
 * Get
 */
export const loadInvoices = createAction('[Invoices] Load');

export const loadInvoicesSuccess = createAction('[Invoices] Load Success', props<{
  invoices: Invoice[]
}>());

export const loadInvoicesFail = createAction('[Invoices] Load Fail');

/**
 * Add
 */
export const addInvoice = createAction('[Invoices] Add');

export const addInvoiceSuccess = createAction('[Invoices] Add Success', props<{
  invoice: Invoice
}>());

export const addInvoiceFail = createAction('[Invoices] Add Fail');

/**
 * Edit
 */
export const editInvoice = createAction('[Invoices] Edit', props<{
  invoice: Omit<Invoice, 'id'>
}>());

export const editInvoiceSuccess = createAction('[Invoices] Edit Success', props<{
  invoice: Invoice,
  updatedAt: string
}>());

export const editInvoiceFail = createAction('[Invoices] Edit Fail');

/**
 * Delete
 */
export const deleteInvoice = createAction('[Invoices] Delete', props<{
  id: string
}>());

export const deleteInvoiceSuccess = createAction('[Invoices] Delete Success', props<{
  id: string
}>());

export const deleteInvoiceFail = createAction('[Invoices] Delete Fail');
