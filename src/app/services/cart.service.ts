import { Injectable } from '@angular/core';
import { Pizza } from '../interfaces/pizza';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    items = [];
    itemsCount: { id: number, count: number };

    constructor() { }

    addToCart(product) {

        // this.itemsCount.id = product.id;
        // this.itemsCount.count += 1;

        this.items.push(product);

        // console.log(this.itemsCount);
    }

    getItems() {
        return this.items;
    }

    clearCart() {
        this.items = [];
        return this.items;
    }
}