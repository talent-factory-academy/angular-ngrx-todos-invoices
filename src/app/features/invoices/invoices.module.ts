import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InvoicesRoutingModule } from './invoices-routing.module';
import { InvoicesComponent } from './invoices.component';
import { InvoiceComponent } from './invoice.component';
import { StoreModule } from '@ngrx/store';
import { featureKey, InvoicesEffects, invoicesReducer } from './store/invoices';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    InvoicesComponent,
    InvoiceComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InvoicesRoutingModule,
    StoreModule.forFeature(featureKey, invoicesReducer),
    EffectsModule.forFeature([InvoicesEffects])
  ],
})
export class InvoicesModule {}
