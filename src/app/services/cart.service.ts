import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private subject = new Subject<any>();
    private items: Array<Object> = [];
    private itemQuantity: Map<any, any> = new Map().set('', 0);
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
        this.updateItemQuantity(product, 1);
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
        let product = this.items[idx];
        let productName = product['name'];
        let productPrice = product['price'];
        
        this.updateItemQuantity(product, -1);
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

    // FIXME: this needs to account product size as well as handling special products like Delivery
    updateItemQuantity(product: any, quantity: number) {
        let nKey: string = '';
        let nVal: number = 0;

        for (let [key, val] of this.itemQuantity) {
            if (key == product.name) {
                nKey = key;
                nVal = val + quantity;
                break;
            } else {
                nKey = product.name;
                nVal = quantity;
            }
        };

        this.itemQuantity.set(nKey, nVal);

        console.log(this.itemQuantity);
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
        this.totalItemsQuantity = 0;
        this.subject.next('Empty!');

        return this.items;
    }
}