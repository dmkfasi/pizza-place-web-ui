import { Component, OnInit } from '@angular/core';
import { PizzaService } from 'src/app/services/pizza-service.service';
import { Pizza } from "src/app/interfaces/Pizza";
import { CartService } from 'src/app/services/cart.service';

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
    });
  }

  addToCart(pizza: Pizza): void {
    this.cartService.addToCart(pizza);
    window.alert('Your product has been added to the cart!');
  }
}
