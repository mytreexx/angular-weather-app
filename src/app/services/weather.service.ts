import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environment/enviroment';
import { CurrentWeather, FiveDayForecast } from './response';

const weatherApiUrl = 'http://dataservice.accuweather.com';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  private apiRequest<T>(path: string) {
    const params = new HttpParams({}).set('apikey', environment.apiKey);

    return this.http.get<T>(`${weatherApiUrl}${path}`, {
      params,
    });
  }

  public getCurrentWeather() {
    return this.apiRequest<CurrentWeather[]>('/currentconditions/v1/215854');
  }

  public getFiveDayForecast() {
    return this.apiRequest<FiveDayForecast>('/forecasts/v1/daily/5day/215854');
  }
}
