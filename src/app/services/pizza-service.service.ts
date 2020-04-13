import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pizza } from '../interfaces/pizza';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {
  private baseURL: string = "http://localhost:8080/api/v1/Pizza";
  private pizzaProducts: [];

  constructor(private http: HttpClient) { }

  getPizzaList() {
    return this.http.get<Pizza[]>(this.baseURL);
  }

  getPizzaByName(pizza: string) {
    return this.http.get<Pizza>(this.baseURL + '/' + pizza);
  }
}
