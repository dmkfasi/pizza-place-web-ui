import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pizza } from "../interfaces/Pizza";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PizzaService {
  // TODO: move to a config file
  private baseURL: string = "https://pizza-place-backend.herokuapp.com/api/v1/Pizza";

  constructor(private http: HttpClient) { }

  getPizzaList(): Observable<any> {
    return this.http.get<Pizza[]>(this.baseURL);
  }

  getPizzaByName(pizza: string): Observable<any> {
    return this.http.get<Pizza>(this.baseURL + '/' + pizza);
  }
}
