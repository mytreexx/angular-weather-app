import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import iconMap from '../../pages/home/iconMap';

import { CurrentWeather } from 'src/app/services/response';
import {
  faHeartCircleMinus,
  faHeartCirclePlus,
} from '@fortawesome/free-solid-svg-icons';
import { FavoritesService } from 'src/app/services/favorites.service';
import { WeatherService } from 'src/app/services/weather.service';
import { LocationService } from 'src/app/services/location.service';
import { UserSettingsService } from 'src/app/services/user-settings.service';

@Component({
  selector: 'app-city-card',
  templateUrl: './city-card.component.html',
  styleUrls: ['./city-card.component.scss'],
})
export class CityCardComponent implements OnChanges {
  @Input() cityId: number;
  @Input() cityName: string;

  public currentWeather: CurrentWeather;
  public currentWeatherIcon: IconProp;
  isFavorite: boolean;
  favoriteIcon: IconProp;
  temperatureValue: number;
  temperatureUnit: 'C' | 'F';
  weatherText: string;

  constructor(
    public favoritesService: FavoritesService,
    private weatherApiService: WeatherService,
    private locationService: LocationService,
    private snackBarService: MatSnackBar,
    private userSettingsService: UserSettingsService
  ) {}

  ngOnInit(): void {
    this.userSettingsService.metric.subscribe(() => this.getCurrentWeather());
    this.updateFavorite();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const cityId = changes['cityId'];
    if (cityId.currentValue !== cityId.previousValue) {
      this.getCurrentWeather();
      this.updateFavorite();
    }
  }

  updateFavorite() {
    this.isFavorite = this.favoritesService.checkIfFavorite(this.cityId);
    this.favoriteIcon = this.isFavorite
      ? faHeartCircleMinus
      : faHeartCirclePlus;
  }

  public getCurrentWeather() {
    this.weatherApiService.getCurrentWeather(this.cityId).subscribe((data) => {
      const { WeatherIcon, Temperature, WeatherText } = data[0];
      const isMetric = this.userSettingsService.metric.getValue();

      this.currentWeather = data[0];
      this.currentWeatherIcon = iconMap[WeatherIcon];

      this.temperatureValue = isMetric
        ? Temperature.Metric.Value
        : Temperature.Imperial.Value;

      this.temperatureUnit = isMetric
        ? Temperature.Metric.Unit
        : Temperature.Imperial.Unit;
      this.weatherText = WeatherText;
    });
  }

  public toggleFavorite() {
    this.isFavorite
      ? this.favoritesService.removeFromFavorites(this.cityId)
      : this.favoritesService.addToFavorites({
          id: this.cityId,
          name: this.cityName,
        });

    this.updateFavorite();

    if (this.isFavorite) {
      this.snackBarService.open(
        `${this.cityName} added to favorites`,
        undefined,
        {
          duration: 3000,
        }
      );
    } else {
      this.snackBarService.open(
        `${this.cityName} removed from favorites`,
        undefined,
        {
          duration: 1500,
        }
      );
    }
  }

  public changeCity() {
    this.locationService.changeCity({ id: this.cityId, name: this.cityName });
  }
}
