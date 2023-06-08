import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
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
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-city-card',
  templateUrl: './city-card.component.html',
  styleUrls: ['./city-card.component.scss'],
})
export class CityCardComponent implements OnChanges {
  constructor(
    public favorites: FavoritesService,
    private weatherApi: WeatherService,
    private location: LocationService
  ) {}

  @Input() cityId: number;
  @Input() cityName: string;

  public currentWeather: CurrentWeather;
  public currentWeatherIcon: IconProp;
  isFavorite: boolean;
  favoriteIcon: IconProp;

  ngOnInit(): void {
    this.getCurrentWeather();
    this.isFavorite = this.favorites.checkIfFavorite(this.cityId);
    this.favoriteIcon = this.isFavorite
      ? faHeartCircleMinus
      : faHeartCirclePlus;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const cityId = changes['cityId'];
    if (cityId.currentValue !== cityId.previousValue) {
      this.getCurrentWeather();
    }
  }

  public getCurrentWeather() {
    this.weatherApi.getCurrentWeather(this.cityId).subscribe((data) => {
      this.currentWeather = data[0];
      this.currentWeatherIcon = iconMap[data[0].WeatherIcon];
    });
  }

  public toggleFavorite() {
    this.isFavorite
      ? this.favorites.removeFromFavorites(this.cityId)
      : this.favorites.addToFavorites({ id: this.cityId, name: this.cityName });

    this.isFavorite = this.favorites.checkIfFavorite(this.cityId);

    this.favoriteIcon = this.isFavorite
      ? faHeartCircleMinus
      : faHeartCirclePlus;
  }

  public changeCity() {
    this.location.changeCity({ id: this.cityId, name: this.cityName });
  }
}
