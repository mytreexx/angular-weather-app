import { Component } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { DailyForecast } from 'src/app/services/response';
import { City, LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public fiveDayForecast: DailyForecast[];
  public currentCity: City;

  constructor(
    private weatherApi: WeatherService,
    public location: LocationService
  ) {}

  ngOnInit(): void {
    this.location.city.subscribe((city) => {
      this.currentCity = city;
      this.getFiveDayForecast();
    });
  }

  public getFiveDayForecast() {
    this.weatherApi
      .getFiveDayForecast(this.currentCity.id)
      .subscribe((data) => {
        this.fiveDayForecast = data.DailyForecasts;
      });
  }
}
