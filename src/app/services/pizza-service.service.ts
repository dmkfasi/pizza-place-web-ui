import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pizza } from '../interfaces/pizza';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {
  // TODO: move to a config file
  private baseURL: string = "https://pizza-place-backend.herokuapp.com/api/v1/Pizza";
  private pizzaProducts: [];

  constructor(private http: HttpClient) { }

  getPizzaList() {
    return this.http.get<Pizza[]>(this.baseURL);
  }

  getPizzaByName(pizza: string) {
    return this.http.get<Pizza>(this.baseURL + '/' + pizza);
  }
}
