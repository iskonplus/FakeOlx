import { ErrorService } from '../shared/httpError/error.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject, catchError, of, Subject, switchMap, tap, throwError } from 'rxjs';
import { Product } from '../types/product';
// import { NewProduct } from '../types/new-product';
import { UserAds } from '../types/user-ads';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  constructor(private http: HttpClient, private errorService: ErrorService) { }

  urlProducts = 'https://fakestoreapi.com/products';
  urlUserAds = 'https://682896b46075e87073a44738.mockapi.io/notOlx/ads';

  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();

  private userAdsSubject = new BehaviorSubject<UserAds>({ userId: '', totalAds: [] });
  userAds$ = this.userAdsSubject.asObservable();


  fetchProducts(): Observable<Product[]> {

    return this.http.get<Product[]>(this.urlProducts).pipe(
      tap((products) => {
        this.setProducts(products);
        this.getAllUsersAds().subscribe();
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

  updateUserAds(newProduct: Product, userId: string): Observable<UserAds> {

    const currentUserAds = this.userAdsSubject.getValue();
    const updatedAd: UserAds = {
      userId: userId,
      totalAds: [...currentUserAds.totalAds, newProduct]
    };

    this.setUserAds(updatedAd);

    return this.http.put<UserAds>(`${this.urlUserAds}/${userId}`, updatedAd).pipe(
      tap(() => {
        const currentProducts = this.getCurrentProducts();
        this.setProducts([ ...currentProducts, newProduct ]);
      })
    );
  }

  deleteUserAd(adId: number, userId: string): Observable<UserAds> {
    const currentUserAds = this.userAdsSubject.getValue();
    const updatedAd: UserAds = {
      userId: userId,
      totalAds: [...currentUserAds.totalAds.filter(ad => ad.id !== adId)]
    };

    this.setUserAds(updatedAd);

    return this.http.put<UserAds>(`${this.urlUserAds}/${userId}`, updatedAd).pipe(
      tap(() => {
        const updateProducts = this.getCurrentProducts().filter(product => product.id !== adId);
        this.setProducts([...updateProducts]);
      })
    );
  }



  getUserAds(userId: string): Observable<UserAds> {
    return this.http.get<UserAds>(`${this.urlUserAds}/${userId}`);
  }


  setUserAds(userAds: UserAds): void {
    this.userAdsSubject.next(userAds);
  }



  getAllUsersAds(): Observable<UserAds[]> {
    return this.http.get<UserAds[]>(this.urlUserAds)
      .pipe(
        tap(data => {
          const currentProducts = this.getCurrentProducts();
          const usersAdsProducts: Product[] = [];
          data.forEach(userAds => {
            userAds.totalAds.forEach(userAd => usersAdsProducts.push(userAd as Product))
          })
          this.setProducts([...currentProducts, ...usersAdsProducts]);
        })
      )
  }

  generateUniqueId(): number {
    const currentProducts = this.getCurrentProducts();
    const existingIds = currentProducts.map(product => product.id);
    let newId = 1;

    while (existingIds.includes(newId)) {
      newId++;
    }

    return newId;
  }


  getCurrentProducts(): Product[] {
    return this.productsSubject.getValue();
  }

  getCurrentUserAdsId(): number[] {
    return this.userAdsSubject.getValue().totalAds.map(ad => ad.id);
  }

}
