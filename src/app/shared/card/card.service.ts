import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private readonly favoriteProd = 'favoriteProducts';
  private favoritesSubject = new BehaviorSubject<number[]>(this.getFavoritesFromStorage());
  favorites$ = this.favoritesSubject.asObservable();

  private getFavoritesFromStorage(): number[] {
    const data = localStorage.getItem(this.favoriteProd);
    return data ? JSON.parse(data) : [];
  }

  private updateFavoritesStorage(favorites: number[]): void {
    localStorage.setItem(this.favoriteProd, JSON.stringify(favorites));
    this.favoritesSubject.next(favorites);
  }

  getFavorites(): number[] {
    return this.favoritesSubject.value;
  }

  isFavorite(productId: number): boolean {
    return this.getFavorites().includes(productId);
  }

  addFavorite(productId: number): void {
    const favorites = this.getFavorites();
    if (!favorites.includes(productId)) {
      this.updateFavoritesStorage([...favorites, productId]);
    }
  }

  removeFavorite(productId: number): void {
    const updated = this.getFavorites().filter(id => id !== productId);
    this.updateFavoritesStorage(updated);
  }

  toggleFavorite(productId: number): void {
    this.isFavorite(productId)
      ? this.removeFavorite(productId)
      : this.addFavorite(productId);
  }
}
