import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
    {
        path: '',
        redirectTo: 'pizza',
        pathMatch: 'full'
    },
    {
        path: 'pizza',
        loadChildren: () => import('./pizza/pizza.module').then(m => m.PizzaModule)
    },
    {
        path: 'customer',
        loadChildren: () => import('./customer/customer.module').then(m => m.CustomersModule)
    },
    {
        path: 'orders',
        loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule)
    },
    {
        path: 'cart',
        loadChildren: () => import('./cart/cart.module').then(m => m.CartModule)
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
