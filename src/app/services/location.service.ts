import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface City {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  city: BehaviorSubject<City> = new BehaviorSubject({
    id: 215854,
    name: 'Tel-Aviv',
  });

  changeCity(city: City) {
    this.city.next(city);
  }
}
