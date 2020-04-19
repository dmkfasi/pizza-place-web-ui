import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Size } from '../interfaces/Size';
import { LineItem } from '../interfaces/LineItem';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private subject = new Subject<any>();
    // private items: Array<Object> = [];
    private lineItemList: Array<LineItem> = [];
    private totalCost: number = 0;
    private totalItemsQuantity: number = 0;
    private deliveryIsSet: boolean = false;

    constructor() { }

    // Allow subscriptions for updates in the Cart contents
    getUpdates(): Observable<any> {
        return this.subject.asObservable();
    }

    addToCart(product: any): void {
        // Stack products onto array
        this.updateItemQuantity(product, 1, product.selectedSize);
        this.updateTotalCost(product.price);

        // TODO refactor this
        if (product.name === 'Delivery') {
            this.deliveryIsSet = true;
        } else {
            this.totalItemsQuantity += 1;
        }

        this.subject.next(product.name + ' just added!');
    }

    removeFromCart(idx: number): void {
        let product = this.lineItemList[idx];
        let productName = product['name'];
        let productPrice = product['price'];

        // this.updateItemQuantity(product, -1);
        this.lineItemList.splice(idx, 1);

        // TODO refactor
        if (productName === 'Delivery') {
            this.deliveryIsSet = false;
        } else {
            this.totalItemsQuantity -= 1;
        }

        // Dispose of cart contents properly when there are no items left
        if (this.lineItemList.length == 0) {
            this.clearCart();
        } else {
            // Update Cart totals accordingly
            this.updateTotalCost(-productPrice);

            // Notify subscribers about item removed
            this.subject.next(productName + ' was removed!');
        }

    }

    hasDelivery(): boolean {
        return this.deliveryIsSet;
    }

    updateTotalCost(cost: number): void {
        // Update total cost property
        this.totalCost += Number(cost);
    }

    // FIXME: this needs to account product size as well as handling special products like Delivery
    updateItemQuantity(product: any,
        quantity: number,
        selectedSize?: Size): void {

        // Find product of the size specified in the Lineitem list
        const lineItem = this.lineItemList.find((item) => {
            return (product == item.product && item.size == selectedSize) ? true : false;
        });

        // Add new product in case there is no such item of the size found
        if (undefined === lineItem) {
            if (quantity > 0) {
                let lineItem: LineItem =
                {
                    product: product, qty: quantity, size: selectedSize
                };
                this.lineItemList.push(lineItem);
            }
        } else {
            // Update quantity on the item of the size found
            lineItem.qty += quantity;
        }
    }

    getTotalCost(): number {
        return this.totalCost;
    }

    getLineitemQuantity(): number {
        return this.totalItemsQuantity;
    }

    getLineItems(): Array<Object> {
        return this.lineItemList;
    }

    clearCart(): Array<Object> {
        this.lineItemList = [];
        this.totalCost = 0;
        this.totalItemsQuantity = 0;
        this.subject.next('Empty!');

        return this.lineItemList;
    }
}