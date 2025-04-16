import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Card } from '../types/card';
import { Observable } from 'rxjs/internal/Observable';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  constructor(private http: HttpClient) { }

  urlProducts = 'https://fakestoreapi.com/products';

  getProducts(): Observable<Card[]> {
    return this.http.get<Card[]>(this.urlProducts)
  }
}
