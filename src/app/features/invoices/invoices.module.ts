import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InvoicesRoutingModule } from './invoices-routing.module';
import { InvoicesComponent } from './invoices.component';
import { InvoiceComponent } from './invoice.component';
import { StoreModule } from '@ngrx/store';
import { InvoicesEffects, invoicesReducer } from './store/invoices';
import { ClientsEffects, clientsReducer } from './store/clients';
import { EffectsModule } from '@ngrx/effects';
import { MaterialModule } from '../../material.module';

@NgModule({
  declarations: [
    InvoicesComponent,
    InvoiceComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InvoicesRoutingModule,
    MaterialModule,
    StoreModule.forFeature('invoices', {
      invoices: invoicesReducer,
      clients: clientsReducer
    }),
    EffectsModule.forFeature([InvoicesEffects, ClientsEffects])
  ],
})
export class InvoicesModule {}
