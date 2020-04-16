import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CartService } from '../../services/cart.service';
import { PizzaService } from 'src/app/services/pizza.service';
import { Pizza } from "src/app/interfaces/Pizza";
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-pizza-details',
  templateUrl: './pizza-details.component.html',
  styleUrls: ['./pizza-details.component.css']
})

export class PizzaDetailsComponent implements OnInit {
  public pizza: Pizza;
  private pizzaName: string;
  public toppingsListString: string;

  constructor(private route: ActivatedRoute,
    private cartService: CartService,
    private pizzaService: PizzaService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.pizzaName = params.get('name');
    });

    this.pizzaService.getPizzaByName(this.pizzaName).subscribe(data => {
      this.pizza = data[0];
      
      // Fill in basic toppings list
      this.toppingsListString = this.pizza.toppings.map(function (t) {
        return t.ingredient;
      }).join(', ');

      // Setup display price to base price
      this.updatePrice(this.pizza.sizes[0].priceMarkup);
      // Setup display dia to base size
      this.updateSize(this.pizza.sizes[0].dia);
    });

  }

  updatePrice(markup: number) {
    // Update price according to the selected Pizza Size
    this.pizza.price = this.pizza.basePrice * markup;
  }

  updateSize(dia: number) {
    // Update size display according to the selected Pizza Size
    this.pizza.dia = dia;
  }

  addToCart(pizza: Pizza) {
    this.cartService.addToCart(pizza);
  }

  displayToast(toastName: string): void {
    AppComponent.displayToast(toastName);
  }
}