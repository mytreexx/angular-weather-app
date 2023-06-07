import { Component } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import iconMap from './iconMap';
import { WeatherService } from 'src/app/services/weather.service';
import { CurrentWeather, DailyForecast } from 'src/app/services/response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public currentWeather: CurrentWeather;
  public fiveDayForecast: DailyForecast[];
  public currentWeatherIcon: IconProp;

  constructor(private weather: WeatherService) {}

  ngOnInit(): void {
    this.getCurrentWeather();
    this.getFiveDayForecast();
  }

  public getCurrentWeather() {
    this.weather.getCurrentWeather().subscribe((data) => {
      this.currentWeather = data[0];
      this.currentWeatherIcon = iconMap[data[0].WeatherIcon];
    });
  }

  public getFiveDayForecast() {
    this.weather.getFiveDayForecast().subscribe((data) => {
      this.fiveDayForecast = data.DailyForecasts;
    });
  }
}
