import { Injectable } from '@angular/core';
import { City } from './location.service';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  favorites: City[] = [];

  constructor() {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      this.favorites = JSON.parse(storedFavorites);
    }

    console.log('constructor', this.favorites);
  }

  checkIfFavorite(id: number) {
    const result = this.favorites.some((favorite) => favorite.id === id);
    console.log('checkIfFavorite', { id, result });
    return result;
  }

  addToFavorites(city: City) {
    if (this.checkIfFavorite(city.id)) return;
    this.favorites.push(city);
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }
  removeFromFavorites(cityId: number) {
    this.favorites = this.favorites.filter((city: City) => city.id !== cityId);
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }
}
