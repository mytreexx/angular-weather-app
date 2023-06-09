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
  metric = new BehaviorSubject(false);
  theme = new BehaviorSubject(Theme.Light);

  constructor() {}

  public toggleTheme() {
    this.theme.next(
      this.theme.getValue() === Theme.Light ? Theme.Dark : Theme.Light
    );
  }

  public toggleUnits() {
    this.metric.next(!this.metric.getValue());
  }
}
