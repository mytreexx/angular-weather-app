import { Component } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { CurrentWeather, FiveDayForecast } from 'src/app/services/response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public currentWeather: CurrentWeather;
  public fiveDayForecast: FiveDayForecast;
  public currentWeatherIcon: IconProp;

  constructor(private weather: WeatherService) {}

  ngOnInit(): void {
    this.getCurrentWeather();
    this.getFiveDayForecast();
  }

  public getCurrentWeather() {
    this.weather.getCurrentWeather().subscribe((data) => {
      this.currentWeather = data;
    });
  }

  public getFiveDayForecast() {
    this.weather.getFiveDayForecast().subscribe((data) => {
      this.fiveDayForecast = data;
    });
  }
}
