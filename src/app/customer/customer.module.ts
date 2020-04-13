import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CustomerCardComponent } from './customer-card/customer-card.component';
import { CustomerRoutingModule } from './customer-routing.module';

@NgModule({
  declarations: [CustomerCardComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CustomersModule { }
