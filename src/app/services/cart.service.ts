import { Injectable, Output } from '@angular/core';
import { Pizza } from '../interfaces/pizza';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    items = [];
    itemsCount: { id: number, count: number };
    observer;

    constructor() {
    }

    setupObservable() {
        const cartObservable = new Observable(observer => {
            this.observer = observer;
        });

        return cartObservable;
    }

    addToCart(product) {
        this.items.push(product);
        this.observer.next(this.items[-1]);
        this.observer.complete();
    }    

    getItems() {
        return this.items;
    }

    clearCart() {
        this.items = [];
        return this.items;
    }
}