import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { CurrentWeather, FiveDayForecast } from './response';
import { LocationService } from './location.service';

const weatherApiUrl = 'http://dataservice.accuweather.com';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient, private location: LocationService) {}

  private apiRequest<T>(path: string) {
    const params = new HttpParams({})
      .set('apikey', environment.apiKey)
      .set('metric', true);

    return this.http.get<T>(`${weatherApiUrl}${path}`, {
      params,
    });
  }

  public getCurrentWeather(id: number) {
    return this.apiRequest<CurrentWeather[]>(`/currentconditions/v1/${id}`);
  }

  public getFiveDayForecast() {
    return this.apiRequest<FiveDayForecast>(
      `/forecasts/v1/daily/5day/${this.location.city.id}`
    );
  }
}
