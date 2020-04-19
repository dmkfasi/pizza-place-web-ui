import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Delivery } from "../../interfaces/Delivery";
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lineitem-list',
  templateUrl: './lineitem-list.component.html',
  styleUrls: ['./lineitem-list.component.css']
})
export class LineitemListComponent implements OnInit {
  cartSubscription: Subscription;
  public items: Array<Object> = [];
  public hasDelivery: boolean = false;
  public totalCost: number = 0;
  public currencyCode: string = '';

  // TODO: fetch from backend app
  delivery: Delivery = {
    name: 'Delivery',
    price: 3.49,
    basePrice: 3.49,
    baseCurrency: 'EUR'
  };

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    // Update essential properties upon entering the component
    this.currencyCode = this.cartService.getCurrencyInUse();
    this.items = this.cartService.getLineItems();
    this.totalCost = this.cartService.getTotalCost();
    this.hasDelivery = this.cartService.hasDelivery();

    // Get updates when Shopping Cart has some changes
    this.cartSubscription = this.cartService.getUpdates().subscribe(() => {
      this.currencyCode = this.cartService.getCurrencyInUse();
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

  increaseItem(product: any): void {
    this.cartService.addToCart(product);
  }

  deductItem(idx: number): void {
    this.cartService.deductItem(idx);
  }

  removeItem(idx: number): void {
    this.cartService.removeItem(idx);
  }

  checkOut(): void {
    this.clearCart();
  }
  
  clearCart(): void {
    this.cartService.clearCart();
    this.hasDelivery = false;
  }
  
  goHome(): void {
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }
}