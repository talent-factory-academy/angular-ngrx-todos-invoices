import { Client } from '../../models';
import { createReducer, on } from '@ngrx/store';
import { loadClientsSuccess } from './clients.actions';

export interface ClientsState {
  clients: Client[];
}

export const initialState: ClientsState = {
  clients: []
}

export const clientsReducer = createReducer(
  initialState,
  on(loadClientsSuccess, (state, action) => ({ ...state, clients: action.clients, loading: false })),
)
