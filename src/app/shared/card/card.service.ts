import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private readonly FAVORITE_KEY = 'favoriteProducts';
  private currentUserId: string = 'guest';

  private favoritesSubject = new BehaviorSubject<number[]>([]);
  favorites$ = this.favoritesSubject.asObservable();

  constructor() {}

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
}
