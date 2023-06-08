import { Component } from '@angular/core';
import { GeolocationService } from '@ng-web-apis/geolocation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private readonly geolocation: GeolocationService) {}

  title = 'angular-weather-app';

  ngOnInit(): void {
    this.getPosition();
  }

  getPosition() {
    this.geolocation.subscribe((position: any) =>
      console.log(position.coords.latitude, position.coords.longitude)
    );
  }
}
