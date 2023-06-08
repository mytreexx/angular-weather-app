import { Injectable } from '@angular/core';

enum Theme {
  Dark = 'dark',
  Light = 'light',
}

@Injectable({
  providedIn: 'root',
})
export class UserSettingsService {
  metric: boolean = true;
  theme: Theme = Theme.Light;

  constructor() {}
}
