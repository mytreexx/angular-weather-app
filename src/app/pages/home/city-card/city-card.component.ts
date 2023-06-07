import { Component, Input } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { CurrentWeather } from 'src/app/services/response';
import {
  faHeartCircleMinus,
  faHeartCirclePlus,
} from '@fortawesome/free-solid-svg-icons';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-city-card',
  templateUrl: './city-card.component.html',
  styleUrls: ['./city-card.component.scss'],
})
export class CityCardComponent {
  @Input() weather: CurrentWeather;
  @Input() icon: IconProp;
  @Input() cityId: number;

  constructor(public favorites: FavoritesService) {}

  isFavorite = this.favorites.favorites.some(
    (favorite) => favorite === this.cityId
  );
  favoriteIcon = this.isFavorite ? faHeartCircleMinus : faHeartCirclePlus;

  toggleFavorite() {
    this.isFavorite
      ? this.favorites.removeFromFavorites(this.cityId)
      : this.favorites.addToFavorites(this.cityId);

    this.isFavorite = this.favorites.favorites.some(
      (favorite) => favorite === this.cityId
    );

    this.favoriteIcon = this.isFavorite
      ? faHeartCircleMinus
      : faHeartCirclePlus;
  }
}
