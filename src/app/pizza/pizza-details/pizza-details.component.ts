import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AppComponent } from 'src/app/app.component';
import { CartService } from 'src/app/services/cart.service';
import { PizzaService } from 'src/app/services/pizza.service';
import { Pizza } from "src/app/interfaces/Pizza";
import { Size } from 'src/app/interfaces/Size';

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

    // Fetch Pizza list from the endpoint
    this.pizzaService.getPizzaByName(this.pizzaName).subscribe(data => {
      this.pizza = data[0];
      
      // Fill in basic toppings list
      this.toppingsListString = this.pizza.toppings.map(function (t) {
        return t.ingredient;
      }).join(', ');

      // FIXME: refactor to a common object
      // Setup display price to base price
      this.updatePrice(this.pizza.sizes[0].priceMarkup);
      // Setup display dia to base size
      this.updateDia(this.pizza.sizes[0].dia);
      this.updateSize(this.pizza.sizes[0]);
    });

  }

  updatePrice(markup: number) {
    // Update price according to the selected Pizza Size
    this.pizza.price = this.pizza.basePrice * markup;
  }

  updateDia(dia: number) {
    // Update size display according to the selected Pizza Size
    this.pizza.dia = dia;
  }

  updateSize(size: Size) {
    // Update size according to the selected Pizza Size
    this.pizza.selectedSize = size;
  }

  addToCart(pizza: Pizza) {
    this.cartService.addToCart(pizza);
  }

  displayToast(toastName: string): void {
    AppComponent.displayToast(toastName);
  }
}