import { Component } from '@angular/core';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  shoppingCartIsEmpty: boolean = true;
  addedItemName: string = 'Hurry up some buy!';

  constructor(private cartService: CartService) { }

  ngOnInit() {
    // Display notification upon Shopping Cart icon and update Tooltip for it
    const cartObservable = this.cartService.setupObservable();
    cartObservable.subscribe((itemName: any) => {
      this.shoppingCartIsEmpty = false;
      this.addedItemName = itemName;
    });
  }
}
