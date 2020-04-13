import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PizzaListComponent } from './pizza-list/pizza-list.component';
import { PizzaDetailsComponent } from './pizza-details/pizza-details.component';


const routes: Routes = [
  {
    path: '',
    component: PizzaListComponent
  },
  {
    path: ':name',
    component: PizzaDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PizzaRoutingModule { }
