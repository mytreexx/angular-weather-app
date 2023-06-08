import { Component } from '@angular/core';
import { GeolocationService } from '@ng-web-apis/geolocation';
import { WeatherService } from './services/weather.service';
import { LocationService } from './services/location.service';

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

  ngOnInit(): void {
    this.getPosition();
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
