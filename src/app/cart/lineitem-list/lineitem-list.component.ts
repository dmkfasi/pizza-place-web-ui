import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Delivery } from "../../interfaces/Delivery";

@Component({
  selector: 'app-lineitem-list',
  templateUrl: './lineitem-list.component.html',
  styleUrls: ['./lineitem-list.component.css']
})
export class LineitemListComponent implements OnInit {
  items = [];
  hasDelivery: boolean = false;
  totalCost: number = 0;

  // TODO: fetch from backend app
  delivery: Delivery = {
    name: 'Delivery',
    basePrice: 3.49,
    baseCurrency: 'EUR'
  };

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.items = this.cartService.getItems();
    this.totalCost = this.cartService.getTotalCost();
  }

  addDelivery() {
    this.cartService.addDelivery(this.delivery);
    this.hasDelivery = true;
  }

  clearCart() {
    this.cartService.clearCart();
    this.hasDelivery = false;

    // TODO: replace me with Router Events Subscription
    window.location.reload();
  }
}
