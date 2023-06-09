import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum Theme {
  Dark = 'dark',
  Light = 'light',
}

@Injectable({
  providedIn: 'root',
})
export class UserSettingsService {
  metric = new BehaviorSubject(localStorage.getItem('metric') === 'true');
  theme = new BehaviorSubject(
    localStorage.getItem('theme') === 'dark' ? Theme.Dark : Theme.Light
  );

  constructor() {
    this.metric.subscribe((isMetric) =>
      localStorage.setItem('metric', isMetric.toString())
    );

    this.theme.subscribe((theme) =>
      localStorage.setItem('theme', theme.toString())
    );
  }

  public toggleTheme() {
    this.theme.next(
      this.theme.getValue() === Theme.Light ? Theme.Dark : Theme.Light
    );
  }

  public toggleUnits() {
    this.metric.next(!this.metric.getValue());
  }
}
