import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiveDayForecastComponent } from './five-day-forecast.component';

describe('FiveDayForecastComponent', () => {
  let component: FiveDayForecastComponent;
  let fixture: ComponentFixture<FiveDayForecastComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FiveDayForecastComponent]
    });
    fixture = TestBed.createComponent(FiveDayForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
