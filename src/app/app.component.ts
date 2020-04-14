import { Component } from '@angular/core';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  // cartSubscription: Subscription;
  shoppingCartIsEmpty: boolean = true;
  addedItemName: string = 'Hurry up some buy!';

  constructor(private cartService: CartService) { }

  ngOnInit() {
    // Display notification upon Shopping Cart icon and update Tooltip for it
    this.cartService.getUpdates().subscribe((itemName: string) => {
      this.shoppingCartIsEmpty = false;
      this.addedItemName = itemName;
    });
  }

  ngOnDestroy(): void {
    // this.cartService.getUpdates().unsubscribe();
  }
}
