import { ErrorService } from '../shared/httpError/error.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, of, retry, tap, throwError } from 'rxjs';
import { Product } from '../types/product';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  private products: Product[] = [];
  private productsLoaded = false;

  constructor(private http: HttpClient, private errorService: ErrorService) { }

  urlProducts = 'https://fakestoreapi.com/products';

  fetchProducts(): Observable<Product[]> {
    if (this.productsLoaded) {
      return of(this.products);
    } else {
      return this.http.get<Product[]>(this.urlProducts).pipe(
        retry(3),
        tap((response) => {
          this.products = response;
          this.productsLoaded = true;
        }),
        catchError(this.errorHandler.bind(this))
      );
    }
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handleError(error.message);
    return throwError(()=>error.message);
  }

  getCachedProducts(): Product[] {
    return this.products;
  }

}
