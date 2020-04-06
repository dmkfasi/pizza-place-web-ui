import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LineitemListComponent } from './lineitem-list/lineitem-list.component';


const routes: Routes = [
  {
    path: '',
    component: LineitemListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
