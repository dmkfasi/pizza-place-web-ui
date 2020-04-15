import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Delivery } from "../../interfaces/Delivery";

@Component({
  selector: 'app-lineitem-list',
  templateUrl: './lineitem-list.component.html',
  styleUrls: ['./lineitem-list.component.css']
})
export class LineitemListComponent implements OnInit {
  // cartSubscription: Subscription;
  public items: Array<Object> = [];
  public hasDelivery: boolean = false;
  public totalCost: number = 0;

  // TODO: fetch from backend app
  delivery: Delivery = {
    name: 'Delivery',
    price: 3.49,
    baseCurrency: 'EUR'
  };

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    // Update essential properties upon entering the component
    this.items = this.cartService.getItems();
    this.totalCost = this.cartService.getTotalCost();
    this.hasDelivery = this.cartService.hasDelivery();

    // Get updates when Shopping Cart has some changes
    this.cartService.getUpdates().subscribe(() => {
      this.totalCost = this.cartService.getTotalCost();
      this.hasDelivery = this.cartService.hasDelivery();
    });
  }

  addDelivery(): void {
    // Add as if it were a catalog item
    if (this.hasDelivery === false) {
      this.cartService.addToCart(this.delivery);
      this.hasDelivery = true;
    }
  }

  removeItem(idx: number): void {
    this.cartService.removeFromCart(idx);
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.hasDelivery = false;

    // TODO: replace me with Router Events Subscription
    window.location.reload();
  }

  ngOnDestroy(): void {
    // FIXME
    // this.cartSubscription.unsubscribe();
  }
}