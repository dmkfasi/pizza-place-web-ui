import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PizzaDetailsComponent } from './pizza-details/pizza-details.component';
import { PizzaListComponent } from './pizza-list/pizza-list.component';
import { PizzaRoutingModule } from './pizza-routing.module';

@NgModule({
  declarations: [PizzaListComponent, PizzaDetailsComponent],
  imports: [
    CommonModule,
    PizzaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class PizzaModule { }
