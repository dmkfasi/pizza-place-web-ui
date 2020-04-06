import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { LineitemListComponent } from './lineitem-list/lineitem-list.component';


@NgModule({
  declarations: [LineitemListComponent],
  imports: [
    CommonModule,
    CartRoutingModule
  ]
})
export class CartModule { }
