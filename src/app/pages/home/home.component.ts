import { Component } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { DailyForecast } from 'src/app/services/response';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public fiveDayForecast: DailyForecast[];

  constructor(
    private weatherApi: WeatherService,
    public location: LocationService
  ) {}

  ngOnInit(): void {
    this.getFiveDayForecast();
  }

  public getFiveDayForecast() {
    this.weatherApi.getFiveDayForecast().subscribe((data) => {
      this.fiveDayForecast = data.DailyForecasts;
    });
  }
}
