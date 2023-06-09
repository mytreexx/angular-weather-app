import { Component } from '@angular/core';
import { GeolocationService } from '@ng-web-apis/geolocation';
import { WeatherService } from './services/weather.service';
import { LocationService } from './services/location.service';
import { faCloud } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private readonly geolocation: GeolocationService,
    public weatherApi: WeatherService,
    private location: LocationService
  ) {}

  title = 'angular-weather-app';
  faCloud = faCloud;
  clouds: {
    height: number;
    position: number;
    duration: number;
    delay: number;
  }[];

  ngOnInit(): void {
    this.getPosition();
    this.createClouds();
  }

  createClouds() {
    const numberOfClouds = this.randomNumber(8, 12);
    const screenHeight = window.innerHeight - 64;

    this.clouds = Array.from({ length: numberOfClouds }).map(() => ({
      height: this.randomNumber(90, 160),
      position: this.randomNumber(20, screenHeight),
      duration: this.randomNumber(5, 10),
      delay: this.randomNumber(0, 5),
    }));
  }

  randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  getPosition() {
    this.geolocation.subscribe((position: any) =>
      this.weatherApi
        .getGeoposition(position.coords.latitude, position.coords.longitude)
        .subscribe((data) => {
          this.location.changeCity({
            name: data.LocalizedName,
            id: Number(data.Key),
          });
        })
    );
  }
}
