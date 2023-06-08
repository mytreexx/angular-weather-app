import { Component, Input } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import iconMap from '../iconMap';

import { CurrentWeather } from 'src/app/services/response';
import {
  faHeartCircleMinus,
  faHeartCirclePlus,
} from '@fortawesome/free-solid-svg-icons';
import { FavoritesService } from 'src/app/services/favorites.service';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-city-card',
  templateUrl: './city-card.component.html',
  styleUrls: ['./city-card.component.scss'],
})
export class CityCardComponent {
  constructor(
    public favorites: FavoritesService,
    private weatherApi: WeatherService
  ) {}

  @Input() cityId: number;
  @Input() cityName: string;

  public currentWeather: CurrentWeather;
  public currentWeatherIcon: IconProp;

  ngOnInit(): void {
    this.getCurrentWeather();
  }

  isFavorite = this.favorites.favorites.some(
    (favorite) => favorite.id === this.cityId
  );
  favoriteIcon = this.isFavorite ? faHeartCircleMinus : faHeartCirclePlus;

  public getCurrentWeather() {
    this.weatherApi.getCurrentWeather().subscribe((data) => {
      this.currentWeather = data[0];
      this.currentWeatherIcon = iconMap[data[0].WeatherIcon];
    });
  }

  public toggleFavorite() {
    this.isFavorite
      ? this.favorites.removeFromFavorites(this.cityId)
      : this.favorites.addToFavorites({ id: this.cityId, name: this.cityName });

    this.isFavorite = this.favorites.favorites.some(
      (favorite) => favorite.id === this.cityId
    );

    this.favoriteIcon = this.isFavorite
      ? faHeartCircleMinus
      : faHeartCirclePlus;
  }
}
