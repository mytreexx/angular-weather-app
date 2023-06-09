import { Component, HostListener } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faMoon, faSun, faC, faF } from '@fortawesome/free-solid-svg-icons';
import {
  Theme,
  UserSettingsService,
} from 'src/app/services/user-settings.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public mobileDisplay: boolean;
  public themeIcon: IconProp;
  public unitsIcon: IconProp;

  constructor(private userSettingsService: UserSettingsService) {}

  ngOnInit() {
    this.mobileDisplay = window.innerWidth < 700;
    this.userSettingsService.theme.subscribe(
      (theme) => (this.themeIcon = theme === Theme.Light ? faMoon : faSun)
    );

    this.userSettingsService.metric.subscribe(
      (isMetric) => (this.unitsIcon = isMetric ? faF : faC)
    );
  }

  public toggleTheme() {
    this.userSettingsService.toggleTheme();
  }

  public toggleUnits() {
    this.userSettingsService.toggleUnits();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.mobileDisplay = window.innerWidth < 700;
  }
}
