import { Component, Input } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { CurrentWeather } from 'src/app/services/response';

@Component({
  selector: 'app-city-card',
  templateUrl: './city-card.component.html',
  styleUrls: ['./city-card.component.scss'],
})
export class CityCardComponent {
  @Input() weather: CurrentWeather;
  @Input() icon: IconProp;
}
