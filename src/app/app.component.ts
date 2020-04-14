import { Component } from '@angular/core';
import { CartService } from './services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  cartSubscription: Subscription;
  shoppingCartIsEmpty: boolean = true;
  addedItemName: string = 'Hurry up some buy!';

  constructor(private cartService: CartService) { }

  ngOnInit() {
    // Display notification upon Shopping Cart icon and update Tooltip for it
    let observable = this.cartService.setupObservable();
    this.cartSubscription = observable.subscribe((itemName: any) => {
      this.shoppingCartIsEmpty = false;
      this.addedItemName = itemName;
    });
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }
}
