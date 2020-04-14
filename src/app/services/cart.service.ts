import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Delivery } from '../interfaces/Delivery';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private observer;
    private items = [];
    private totalCost: number = 0;

    constructor() { }

    setupObservable() {
        const cartObservable = new Observable(observer => {
            this.observer = observer;
        });

        return cartObservable;
    }

    addToCart(product: any) {
        // Stack products onto array
        this.items.push(product);
        this.updateTotalCost(product.price);

        this.observer.next(product.name);
    }

    addDelivery(delivery: Delivery) {
        // Add as if it were a catalog item
        this.addToCart(delivery);
    }

    updateTotalCost(cost: number) {
        // Update total cost property
        this.totalCost += Number(cost);
    }

    getTotalCost() {
        return this.totalCost;
    }

    getItems() {
        return this.items;
    }

    clearCart() {
        this.items = [];
        this.totalCost = 0;

        return this.items;
    }
}