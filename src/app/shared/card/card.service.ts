import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserCart } from '../../types/user-cart';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private readonly FAVORITE_KEY = 'favoriteProducts';
  private currentUserId: string = 'guest';

  private favoritesSubject = new BehaviorSubject<number[]>([]);
  favorites$ = this.favoritesSubject.asObservable();

  constructor(private http: HttpClient) { }

  // ----------favorites-----------------

  private getAllFavorites(): Record<string, number[]> {
    const data = localStorage.getItem(this.FAVORITE_KEY);
    return data ? JSON.parse(data) : {};
  }

  private saveAllFavorites(data: Record<string, number[]>) {
    localStorage.setItem(this.FAVORITE_KEY, JSON.stringify(data));
  }

  private getFavoritesFromStorage(): number[] {
    const all = this.getAllFavorites();
    return all[this.currentUserId] || [];
  }

  private updateFavoritesStorage(favorites: number[]) {
    const all = this.getAllFavorites();
    all[this.currentUserId] = favorites;
    this.saveAllFavorites(all);
    this.favoritesSubject.next(favorites);
  }

  setCurrentUser(userId: string) {
    this.currentUserId = userId;
    this.favoritesSubject.next(this.getFavoritesFromStorage());
  }

  toggleFavorite(productId: number) {
    const current = this.getFavoritesFromStorage();
    const updated = current.includes(productId)
      ? current.filter(id => id !== productId)
      : [...current, productId];

    this.updateFavoritesStorage(updated);
  }

  isFavorite(productId: number): boolean {
    return this.favoritesSubject.value.includes(productId);
  }

  // ----------cart-----------------


  baseUrl = 'https://6802395481c7e9fbcc44db3c.mockapi.io/fakeOlx/user-cart';
  private userCartSubject = new BehaviorSubject<UserCart | null>(null);
  userCart$ = this.userCartSubject.asObservable();


  getUserCart(userId: string):Observable <UserCart> {
    return this.http.get<UserCart>(`${this.baseUrl}/${userId}`);
  }

  setUserCart(userCart: UserCart) {
    this.userCartSubject.next(userCart);
  }



}
