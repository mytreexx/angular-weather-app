import { Component } from '@angular/core';
import { FavoritesService } from 'src/app/services/favorites.service';
import { CurrentWeather } from 'src/app/services/response';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent {
  constructor(public favorites: FavoritesService) {}
  favoritesCurrentWeather: CurrentWeather[] = [];

  ngOnInit() {
    console.log(this.favorites.favorites);
  }
}
