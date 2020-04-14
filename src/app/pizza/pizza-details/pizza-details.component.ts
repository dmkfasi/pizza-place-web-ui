import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CartService } from '../../services/cart.service';
import { PizzaService } from 'src/app/services/pizza-service.service';
import { Pizza } from "src/app/interfaces/Pizza";

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
      this.updatePrice(1);
    });

  }

  updatePrice(markup: number) {
    // Update price according to the selected Pizza Size
    this.pizza.price = this.pizza.basePrice * markup;
  }

  addToCart(pizza: Pizza) {
    this.cartService.addToCart(pizza);
    window.alert('Your product has been added to the cart!');
  }
}
