import { Injectable } from '@angular/core';

export interface City {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  // todo check how to use interface here
  city: City = { id: 215854, name: 'Tel-Aviv' };
  constructor() {}

  changeCity(city: City) {
    this.city = city;
  }
}
