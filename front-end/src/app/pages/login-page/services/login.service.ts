import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { User } from '../../../types/user';
import { ActiveUser } from '../../../types/active-user';
import { UserState } from '../../../types/user-state.model';
import { UserCart } from '../../../types/user-cart';
import { UserAds } from '../../../types/user-ads';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private initialUserState: UserState = { isLoggedIn: false };
  private userSubject = new BehaviorSubject<UserState>(this.initialUserState);
  activeUser$ = this.userSubject.asObservable();
  newUserCart!: UserCart;
  newUserAds!: UserAds;

  baseUrl = "https://6802395481c7e9fbcc44db3c.mockapi.io/fakeOlx/";
  urlCreateUserProduct = 'https://682896b46075e87073a44738.mockapi.io/notOlx/';


  constructor(private http: HttpClient) { }


  userLogin(userData: User): Observable<ActiveUser[]> {
    return this.http.get<ActiveUser[]>(`${this.baseUrl}/users?email=${userData.email}&password=${userData.password}`)
  }


  userRegistration(userData: User): Observable<ActiveUser> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    return this.http.post<ActiveUser>(this.baseUrl + '/users', userData, httpOptions);
  }

  createUserCart(userId: string) {
    this.newUserCart = {
      userId: userId,
      totalProductsId: []
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    return this.http.post<User>(this.baseUrl + '/user-cart', this.newUserCart, httpOptions);
  }

  createUserAds(userId: string) {
    this.newUserAds = {
      userId: userId,
      totalAds: []
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    return this.http.post<User>(this.urlCreateUserProduct + '/ads', this.newUserAds, httpOptions);
  }

  setUser(user: ActiveUser) {
    this.userSubject.next({ isLoggedIn: true, user });
  }

  clearUser() {
    this.userSubject.next(this.initialUserState);
  }


  deleteUser(userId: string): Observable<[void, void, void]> {
    const favoritesRaw = localStorage.getItem('favoriteProducts');

    if (favoritesRaw) {
      const favorites = JSON.parse(favoritesRaw);
      delete favorites[userId];
      localStorage.setItem('favoriteProducts', JSON.stringify(favorites));
    }

    const deleteUser$ = this.http.delete<void>(`${this.baseUrl}/users/${userId}`);
    const deleteCart$ = this.http.delete<void>(`${this.baseUrl}/user-cart/${userId}`);
    const deleteAds$ = this.http.delete<void>(`${this.urlCreateUserProduct}/ads/${userId}`);

    return forkJoin([deleteUser$, deleteCart$, deleteAds$]);
  }
}
