import { Component } from '@angular/core';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  shoppingCartIsEmpty: boolean = true;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    const cartObservable = this.cartService.setupObservable();
    cartObservable.subscribe(() => {
      this.shoppingCartIsEmpty = false;
    });
  }
}
