import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { delay, of, retry, tap } from 'rxjs';
import { Product } from '../types/product';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  private products: Product[] = [];
  private productsLoaded = false;

  constructor(private http: HttpClient) { }

  urlProducts = 'https://fakestoreapi.com/products';

  fetchProducts(): Observable<Product[]> {
    // return this.http.get<Product[]>(this.urlProducts).pipe(
    //   delay(1000),
    //   retry(2)
    // )

    if (this.productsLoaded) {
      return of(this.products);
    } else {
      return this.http.get<Product[]>(this.urlProducts).pipe(
        delay(2000),
        retry(3),
        tap((response) => {
          this.products = response;
          this.productsLoaded = true;
        })
      );
    }



  }



  getCachedProducts(): Product[] {
    return this.products;
  }

}
