import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-daily-card',
  templateUrl: './daily-card.component.html',
  styleUrls: ['./daily-card.component.scss'],
})
export class DailyCardComponent {
  @Input() day: any;
}
