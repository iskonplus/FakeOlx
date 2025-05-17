import { ErrorService } from '../shared/httpError/error.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, of, retry, tap, throwError } from 'rxjs';
import { Product } from '../types/product';
import { NewProduct } from '../types/new-product';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  private products: Product[] = [];
  private productsLoaded = false;

  constructor(private http: HttpClient, private errorService: ErrorService) { }

  urlProducts = 'https://fakestoreapi.com/products';
  urlCreateUserProduct = 'https://682896b46075e87073a44738.mockapi.io/notOlx/';

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


  createProduct(product: NewProduct): Observable<Product> {
    return this.http.post<Product>(this.urlProducts, product).pipe(
      tap(prod => this.products.push(prod))
    )

  }

}
