import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  favorites: number[] = [];

  addToFavorites(cityId: number) {
    this.favorites.push(cityId);
    console.log('added to favorites!!!', this.favorites);
  }
  removeFromFavorites(cityId: number) {
    this.favorites = this.favorites.filter((city: number) => city != cityId);
    console.log('removed from favorites!!!', this.favorites);
  }
}
