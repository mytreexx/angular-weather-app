import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environment/enviroment';

const weatherApiUrl = 'http://dataservice.accuweather.com';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  private apiRequest(path: string) {
    const params = new HttpParams({}).set('apikey', environment.apiKey);

    return this.http.get(`${weatherApiUrl}${path}`, {
      params,
    });
  }

  public getCurrentWeather() {
    return this.apiRequest('/currentconditions/v1/215854');
  }

  public getFiveDayForecast() {
    return this.apiRequest('/forecasts/v1/daily/5day/215854');
  }
}
