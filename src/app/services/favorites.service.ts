import { Injectable } from '@angular/core';
import { City } from './location.service';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  favorites: City[] = [
    { id: 231459, name: 'Vilnius' },
    { id: 215836, name: 'Givatayim' },
    { id: 212476, name: 'Rishon LeZiyyon' },
    { id: 215854, name: 'Tel Aviv' },
  ];

  checkIfFavorite(id: number) {
    return this.favorites.some((favorite) => favorite.id === id);
  }

  addToFavorites(city: City) {
    if (this.checkIfFavorite(city.id)) return;
    this.favorites.push(city);
  }
  removeFromFavorites(cityId: number) {
    this.favorites = this.favorites.filter((city: City) => city.id !== cityId);
  }
}
