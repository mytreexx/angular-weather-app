import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public mobileDisplay: boolean;

  ngOnInit() {
    this.mobileDisplay = window.innerWidth < 700;
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.mobileDisplay = window.innerWidth < 700;
  }
}
