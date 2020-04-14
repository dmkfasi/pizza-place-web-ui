import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Delivery } from "../../interfaces/Delivery";

@Component({
  selector: 'app-lineitem-list',
  templateUrl: './lineitem-list.component.html',
  styleUrls: ['./lineitem-list.component.css']
})
export class LineitemListComponent implements OnInit {
  items: Array<Object> = [];
  hasDelivery: boolean = false;
  totalCost: number = 0;

  // TODO: fetch from backend app
  delivery: Delivery = {
    name: 'Delivery',
    price: 3.49,
    baseCurrency: 'EUR'
  };

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.items = this.cartService.getItems();
    this.totalCost = this.cartService.getTotalCost();
  }

  addDelivery(): void {
    if (this.hasDelivery === false) {
      this.cartService.addDelivery(this.delivery);
      this.hasDelivery = true;
    }
  }

  removeItem(id: number): void {
    this.items.splice(id - 1, 1);

    // Dispose of cart contents properly when there are no items left
    if (this.items.length == 0) {
      this.clearCart();
    }
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.hasDelivery = false;

    // TODO: replace me with Router Events Subscription
    window.location.reload();
  }
}