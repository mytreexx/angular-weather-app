import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  favorites: { id: number; name: string }[] = [
    { id: 123, name: 'test' },
    { id: 666, name: 'hi' },
    { id: 5368, name: 'hello' },
    { id: 1233, name: 'yeah' },
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
