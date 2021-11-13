import { Client } from '../../models';
import { createReducer, on } from '@ngrx/store';
import {
  addClientSuccess,
  deleteClientSuccess,
  loadClientsSuccess
} from './clients.actions';

export interface ClientsState {
  clients: Client[];
}

export const initialState: ClientsState = {
  clients: []
}

export const clientsReducer = createReducer(
  initialState,
  on(loadClientsSuccess, (state, action) => ({ ...state, clients: action.clients, loading: false })),
  on(addClientSuccess, (state, action) => ({ ...state, clients: [...state.clients, action.client] })),
  on(deleteClientSuccess, (state, action) => ({ ...state, clients: state.clients.filter(clients => clients.id !== action.id) }))
)
