import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { Delivery } from '../interfaces/Delivery';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private observer: Subscriber<any>;
    private items: Array<Object> = [];
    private totalCost: number = 0;

    constructor() { }

    setupObservable(): Observable<any> {
        const cartObservable = new Observable(observer => {
            this.observer = observer;
        });

        return cartObservable;
    }

    addToCart(product: any): void {
        // Stack products onto array
        this.items.push(product);
        this.updateTotalCost(product.price);

        this.observer.next(product.name);
    }

    removeFromCart(idx: number): void {
        let productName = this.items[idx]['name'];
        let productPrice = this.items[idx]['price'];

        this.items.splice(idx, 1);

        // Dispose of cart contents properly when there are no items left
        if (this.items.length == 0) {
            this.clearCart();
        } else {
            this.updateTotalCost(-productPrice);
            this.observer.next(productName);
        }

    }

    updateTotalCost(cost: number): void {
        // Update total cost property
        this.totalCost += Number(cost);
    }

    getTotalCost(): number {
        return this.totalCost;
    }

    getItems(): Array<Object> {
        return this.items;
    }

    clearCart(): Array<Object> {
        this.items = [];
        this.totalCost = 0;
        this.observer.next('Empty!');

        return this.items;
    }
}