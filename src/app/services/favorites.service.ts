import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  favorites: { id: number; name: string }[] = [
    { id: 231459, name: 'Vilnius' },
    { id: 215836, name: 'Givatayim' },
    { id: 212476, name: 'Rishon LeZiyyon' },
    { id: 215854, name: 'Tel Aviv' },
  ];

  addToFavorites(city: { id: number; name: string }) {
    this.favorites.push(city);
    console.log('added to favorites!!!', this.favorites);
  }
  removeFromFavorites(cityId: number) {
    this.favorites = this.favorites.filter(
      (city: { id: number; name: string }) => city.id !== cityId
    );
    console.log('removed from favorites!!!', this.favorites);
  }
}
