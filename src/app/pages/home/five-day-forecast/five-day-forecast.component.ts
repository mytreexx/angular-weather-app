import { Component, Input } from '@angular/core';
import { DailyForecast } from 'src/app/services/response';

@Component({
  selector: 'app-five-day-forecast',
  templateUrl: './five-day-forecast.component.html',
  styleUrls: ['./five-day-forecast.component.scss'],
})
export class FiveDayForecastComponent {
  @Input() forecast: DailyForecast[];
}
