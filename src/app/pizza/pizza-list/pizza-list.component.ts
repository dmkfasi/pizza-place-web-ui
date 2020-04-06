import { Component, OnInit } from '@angular/core';
import { PizzaService } from 'src/app/services/pizza-service.service';
import { Pizza } from 'src/app/interfaces/pizza';

@Component({
  selector: 'app-pizza-list',
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.css']
})
export class PizzaListComponent implements OnInit {
  protected pizzas: Pizza[];

  constructor(private service: PizzaService) { }

  ngOnInit(): void {
    this.service.getPizzaList().subscribe(data => {
      this.pizzas = data;
    });
  }

}
