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
