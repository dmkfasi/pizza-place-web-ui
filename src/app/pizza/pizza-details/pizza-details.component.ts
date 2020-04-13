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

  constructor(private route: ActivatedRoute,
    private cartService: CartService,
    private pizzaService: PizzaService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.pizzaName = params.get('name');
    });

    this.pizzaService.getPizzaByName(this.pizzaName).subscribe(data => {
      this.pizza = data;
    });
  }

  addToCart(pizza) {
    this.cartService.addToCart(pizza);
    window.alert('Your product has been added to the cart!');
  }
}
