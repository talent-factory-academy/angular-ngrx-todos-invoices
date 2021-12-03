import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ClientsActions from './clients.actions';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ClientsService } from '../../services/clients.service';

@Injectable()
export class ClientsEffects {

  constructor(
    private actions: Actions,
    private clientsService: ClientsService,
  ) {}

  loadClients$ = createEffect(() => this.actions.pipe(
    ofType(ClientsActions.loadClients),
    switchMap(() => this.clientsService.loadClients().pipe(
      map(clients => ClientsActions.loadClientsSuccess({ clients })),
      catchError(() => of(ClientsActions.loadClientsFail()))
    ))
  ));
}
