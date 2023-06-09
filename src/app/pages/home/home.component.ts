import { Component } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { DailyForecast } from 'src/app/services/response';
import { City, LocationService } from 'src/app/services/location.service';
import { UserSettingsService } from 'src/app/services/user-settings.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public fiveDayForecast: DailyForecast[];
  public currentCity: City;

  constructor(
    private weatherApiService: WeatherService,
    private locationService: LocationService,
    private userSettingsService: UserSettingsService
  ) {}

  ngOnInit(): void {
    this.locationService.city.subscribe((city) => {
      this.currentCity = city;
      this.userSettingsService.metric.subscribe(() =>
        this.getFiveDayForecast()
      );
    });
  }

  public getFiveDayForecast() {
    this.weatherApiService
      .getFiveDayForecast(this.currentCity.id)
      .subscribe((data) => {
        this.fiveDayForecast = data.DailyForecasts;
      });
  }
}
