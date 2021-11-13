import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InvoicesRoutingModule } from './invoices-routing.module';
import { InvoicesComponent } from './invoices.component';
import { InvoiceComponent } from './invoice.component';
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
  ],
})
export class InvoicesModule {}
