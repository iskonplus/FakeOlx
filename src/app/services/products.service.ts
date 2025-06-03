import { ErrorService } from '../shared/httpError/error.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject, catchError, of, tap, throwError } from 'rxjs';
import { Product } from '../types/product';
import { NewProduct } from '../types/new-product';
import { UserAds } from '../types/user-ads';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  // private products: Product[] = [];
  private productsLoaded = false;

  constructor(private http: HttpClient, private errorService: ErrorService) { }

  urlProducts = 'https://fakestoreapi.com/products';
  urlUserAds = 'https://682896b46075e87073a44738.mockapi.io/notOlx/ads';

  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();


  count = 0;

  //

  fetchProducts(): Observable<Product[]> {

    return this.http.get<Product[]>(this.urlProducts).pipe(
      tap((products) => {
        this.count++
        this.setProducts(products);
        this.getUsersAds().subscribe();
        console.log(this.count);
      }),
      catchError(this.errorHandler.bind(this))
    );

  }

  setProducts(products: Product[]): void {
    this.productsSubject.next(products);
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handleError(error.message);
    return throwError(() => error.message);
  }

  // getCachedProducts(): Product[] {
  //   // return this.products;
  // }


  // createProduct(product: NewProduct, userId: string): Observable<Product> {
  //   return this.http.post<Product>(this.urlProducts, product).pipe(
  //     tap(prod => {
  //       this.products.push(prod);
  //       this.updateUserAds(prod, userId).subscribe(data=>console.log(data))
  //     })
  //   )

  // }

  updateUserAds(newProduct: Product, userId: string): Observable<UserAds> {
    // const newProdId = this.products[this.products.length - 1].id + 1
    // console.log(newProdId);
    // newProduct.id = newProdId;

    const updatedAd: UserAds = {
      userId: userId,
      totalAds: [newProduct]
    };



    return this.http.put<UserAds>(`${this.urlUserAds}/${userId}`, updatedAd).pipe(
      tap((data) => {
        console.log('Product updated successfully', data);
        // this.products.push(newProduct);
      })
    )

  }


  getUsersAds(): Observable<UserAds[]> {
    return this.http.get<UserAds[]>(this.urlUserAds)
      .pipe(
        tap(data => {
          const currentProducts = this.productsSubject.getValue();
          const usersAdsProducts: Product[] = [];
          data.forEach(userAds => {
            userAds.totalAds.forEach(userAd => usersAdsProducts.push(userAd as Product))
          })
          this.setProducts([...currentProducts, ...usersAdsProducts]);
        })
      )
  }

}
