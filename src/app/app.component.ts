import { Component } from '@angular/core';
import { CartService } from './services/cart.service';
import { Subscription } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  cartSubscription: Subscription;

  addedItemName: string = 'Hurry up some buy!';
  shoppingCartIsEmpty: boolean = true;
  shoppingCartItemsQuantity: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    // Display notification upon Shopping Cart icon and update Tooltip for it
    this.cartSubscription = this.cartService.getUpdates().subscribe((itemName: string) => {
      this.addedItemName = itemName;
      this.shoppingCartItemsQuantity = this.cartService.getLineitemQuantity();

      this.shoppingCartIsEmpty = (this.shoppingCartItemsQuantity == 0)
        ? true
        : false;
    });
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }

  static displayToast(toastName: string): void {
    $('#' + toastName).toast('show');
  }
}
