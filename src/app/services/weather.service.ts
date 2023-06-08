import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { CurrentWeather, FiveDayForecast } from './response';
import { LocationService } from './location.service';
import { API_PATH, PARAMS } from './consts';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient, private location: LocationService) {}

  apiRequest<T>(path: string) {
    const params = new HttpParams({})
      .set(PARAMS.API_KEY, environment.apiKey)
      .set(PARAMS.METRIC, true);

    return this.http.get<T>(`${API_PATH.WEATHER_API_URL}${path}`, {
      params,
    });
  }

  public getCurrentWeather(id: number) {
    return this.apiRequest<CurrentWeather[]>(
      `${API_PATH.CURRENT_CONDITIONS}${id}`
    );
  }

  public getFiveDayForecast() {
    return this.apiRequest<FiveDayForecast>(
      `${API_PATH.FIVE_DAY_FORECAST}${this.location.city.id}`
    );
  }
}
