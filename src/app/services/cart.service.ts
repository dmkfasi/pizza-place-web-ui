import { Injectable } from '@angular/core';
import { Observable, Subscriber, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private subject = new Subject<any>();
    private items: Array<Object> = [];
    private totalCost: number = 0;
    private totalItemsQuantity: number = 0;
    private deliverySet: boolean = false;

    constructor() { }

    // Allow subscriptions for updates in the Cart contents
    getUpdates(): Observable<any> {
        return this.subject.asObservable();
    }

    addToCart(product: any): void {
        // Stack products onto array
        this.items.push(product);
        this.updateTotalCost(product.price);

        // TODO refactor this
        if (product.name === 'Delivery') {
            this.deliverySet = true;
        } else {
            this.totalItemsQuantity += 1;
        }

        this.subject.next(product.name + ' just added!');
    }

    removeFromCart(idx: number): void {
        let productName = this.items[idx]['name'];
        let productPrice = this.items[idx]['price'];

        this.items.splice(idx, 1);

        // TODO refactor
        if (productName === 'Delivery') {
            this.deliverySet = false;
        } else {
            this.totalItemsQuantity -= 1;
        }

        // Dispose of cart contents properly when there are no items left
        if (this.items.length == 0) {
            this.clearCart();
        } else {
            // Update Cart totals accordingly
            this.updateTotalCost(-productPrice);

            // Notify subscribers about item removed
            this.subject.next(productName + ' was removed!');
        }

    }

    hasDelivery(): boolean {
        return this.deliverySet;
    }

    updateTotalCost(cost: number): void {
        // Update total cost property
        this.totalCost += Number(cost);
    }

    getTotalCost(): number {
        return this.totalCost;
    }

    getLineitemQuantity(): number {
        return this.totalItemsQuantity;
    }

    getItems(): Array<Object> {
        return this.items;
    }

    clearCart(): Array<Object> {
        this.items = [];
        this.totalCost = 0;
        this.subject.next('Empty!');

        return this.items;
    }
}