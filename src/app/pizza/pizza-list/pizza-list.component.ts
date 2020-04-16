import { Component, OnInit } from '@angular/core';
import { PizzaService } from 'src/app/services/pizza.service';
import { Pizza } from "src/app/interfaces/Pizza";
import { CartService } from 'src/app/services/cart.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-pizza-list',
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.css']
})
export class PizzaListComponent implements OnInit {
  public pizzas: Pizza[];

  constructor(private pizzaService: PizzaService,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.pizzaService.getPizzaList().subscribe(data => {
      this.pizzas = data;

      this.pizzas.forEach(pizza => {
        pizza.price = Number(pizza.basePrice) * Number(pizza.sizes[0].priceMarkup);
      });
    });
  }

  addToCart(pizza: Pizza): void {
    this.cartService.addToCart(pizza);
  }

  displayToast(toastName: string): void {
    AppComponent.displayToast(toastName);
  }
}