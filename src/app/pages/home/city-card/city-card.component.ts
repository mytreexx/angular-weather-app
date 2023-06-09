import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private location: LocationService,
    private snackBar: MatSnackBar
  ) {}

  @Input() cityId: number;
  @Input() cityName: string;

  public currentWeather: CurrentWeather;
  public currentWeatherIcon: IconProp;
  isFavorite: boolean;
  favoriteIcon: IconProp;
  temperatureValue: number;
  temperatureUnit: 'C' | 'F';
  weatherText: string;

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
      const { WeatherIcon, Temperature, WeatherText } = data[0];

      this.currentWeather = data[0];
      this.currentWeatherIcon = iconMap[WeatherIcon];
      this.temperatureValue = Temperature.Metric.Value;
      this.temperatureUnit = Temperature.Metric.Unit;
      this.weatherText = WeatherText;
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

    if (this.isFavorite) {
      this.snackBar.open(`${this.cityName} added to favorites`, undefined, {
        duration: 3000,
      });
    } else {
      this.snackBar.open(`${this.cityName} removed from favorites`, undefined, {
        duration: 1500,
      });
    }
  }

  public changeCity() {
    this.location.changeCity({ id: this.cityId, name: this.cityName });
  }
}
