import { createAction, props } from '@ngrx/store';
import { Client } from '../../models';

/**
 * Get
 */
export const loadClients = createAction('[Clients] Load');

export const loadClientsSuccess = createAction('[Clients] Load Success', props<{
  clients: Client[]
}>());

export const loadClientsFail = createAction('[Clients] Load Fail');

/**
 * Add
 */
export const addClient = createAction('[Clients] Add', props<{
  client: Partial<Client>
}>());

export const addClientSuccess = createAction('[Clients] Add Success', props<{
  client: Client
}>());

export const addClientFail = createAction('[Clients] Add Fail');

/**
 * Delete
 */
export const deleteClient = createAction('[Clients] Delete', props<{
  id: string
}>());

export const deleteClientSuccess = createAction('[Clients] Delete Success', props<{
  id: string
}>());

export const deleteClientFail = createAction('[Clients] Delete Fail');
