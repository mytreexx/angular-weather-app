import { Component, Input } from '@angular/core';
import { DailyForecast } from 'src/app/services/response';
import iconMap from '../iconMap';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-daily-card',
  templateUrl: './daily-card.component.html',
  styleUrls: ['./daily-card.component.scss'],
})
export class DailyCardComponent {
  public dayIcon: IconProp;
  public nightIcon: IconProp;

  @Input() day: DailyForecast;

  ngOnInit(): void {
    this.dayIcon = iconMap[this.day.Day.Icon];
    this.nightIcon = iconMap[this.day.Night.Icon];
  }
}
