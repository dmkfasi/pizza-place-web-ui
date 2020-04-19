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
    private deliveryIsSet: boolean = false;

    // TODO: refactor to use multicurrency switch and fetch rates from backend
    // TODO: move to a separate Service
    private currencyList: Map<string, number> = new Map().set('EUR', 1.1).set('USD', 0.9);
    private baseCurrency: string = 'EUR';

    constructor() { }

    // Allow subscriptions for updates in the Cart contents
    getUpdates(): Observable<any> {
        return this.subject.asObservable();
    }

    addToCart(product: any): void {
        // TODO refactor this
        if (product.name === 'Delivery') {
            this.deliveryIsSet = true;
        }

        // Stack products onto array
        this.updateItemQuantity(product, 1, product.selectedSize);

        // Notify subscribers
        this.subject.next(product.name + ' just added!');
    }

    deductItem(idx: number): void {
        let lineItem = this.lineItemList[idx].product;
        this.updateItemQuantity(lineItem, -1, lineItem.selectedSize);

        // Notify subscribers
        this.subject.next(lineItem.name + ' was deducted!');
    }

    removeItem(idx: number): void {
        let lineItem = this.lineItemList[idx];
        let productName = lineItem.product.name;

        this.lineItemList.splice(idx, 1);

        // Update Cart totals accordingly
        this.updateTotalCost(-(lineItem.product.price * lineItem.qty));

        // TODO refactor
        if (productName === 'Delivery') {
            this.deliveryIsSet = false;
        }

        // Dispose of cart contents properly when there are no items left
        if (this.lineItemList.length == 0) {
            this.clearCart();
        }

        // Notify subscribers
        this.subject.next(productName + ' was removed!');
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
        let lineItem = this.lineItemList.find((item) => {
            return (product == item.product && item.size == selectedSize) ? true : false;
        });

        // Add new product in case there is no such item of the size found
        if (undefined === lineItem) {
            if (quantity > 0) {
                lineItem =
                {
                    product: product, qty: quantity, size: selectedSize
                };
                this.lineItemList.push(lineItem);
            }
        } else {
            // Update quantity on the item of the size found
            lineItem.qty += quantity;

        }
        // Do not allow deduct below one piece
        // TODO: clarify requirements on how to handle this, might want to remove the item once its quantity reaches zero.
        if (lineItem.qty == 0) {
            lineItem.qty = 1;
            // this.lineItemList.splice(idx, 1);
        } else {
            // Update Cart totals accordingly
            this.updateTotalCost(lineItem.product.price * quantity);
        }
    }

    getTotalCost(): number {
        return this.totalCost;
    }

    getLineitemQuantity(): number {
        // TODO: Think this over: keep tracking via individual property or leave it as is.

        // FIXME: does not work this way due to invalid argument types
        // return this.lineItemList.reduce((sum, lineItem) => {
        //     return sum + lineItem.qty;
        // });
        let sum: number = 0;
        this.lineItemList.forEach((lineItem) => {
            sum += lineItem.qty;
        });

        return sum;
    }

    getLineItems(): Array<Object> {
        return this.lineItemList;
    }

    clearCart(): Array<Object> {
        this.lineItemList = [];
        this.totalCost = 0;
        this.subject.next('Empty!');

        return this.lineItemList;
    }

    getCurrencyInUse(): string {
        return this.baseCurrency;
    }
}