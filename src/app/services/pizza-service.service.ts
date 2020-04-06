import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pizza } from '../interfaces/pizza';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {
  baseURL: string = "api/v1/Pizza";

  constructor(private http: HttpClient) { }

  getPizzaList()
  {
    return this.http.get<Pizza[]>(this.baseURL + "/GetPizzaList");
  }

}
