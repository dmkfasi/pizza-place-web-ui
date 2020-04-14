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

    addDelivery(delivery: Delivery): void {
        // Add as if it were a catalog item
        this.addToCart(delivery);
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

        return this.items;
    }

    ngOnDestroy(): void {
        this.observer.unsubscribe();
    }
}