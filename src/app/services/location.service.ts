import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  // todo check how to use interface here
  city: { id: number; name: string } = { id: 215854, name: 'Tel-Aviv' };
  constructor() {}
}
