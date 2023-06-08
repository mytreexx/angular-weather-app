import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { CurrentWeather, FiveDayForecast, LocationDetails } from './response';
import { API_PATH, PARAMS } from './consts';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  apiRequest<T>(path: string, q = '') {
    let params = new HttpParams({})
      .set(PARAMS.API_KEY, environment.apiKey)
      .set(PARAMS.METRIC, true);

    if (q) {
      params = params.set(PARAMS.Q, q);
    }

    return this.http.get<T>(`${API_PATH.WEATHER_API_URL}${path}`, {
      params,
    });
  }

  public getCurrentWeather(id: number) {
    return this.apiRequest<CurrentWeather[]>(
      `${API_PATH.CURRENT_CONDITIONS}${id}`
    );
  }

  public getFiveDayForecast(cityId: number) {
    return this.apiRequest<FiveDayForecast>(
      `${API_PATH.FIVE_DAY_FORECAST}${cityId}`
    );
  }

  public GetSearchedResults(searchValue: string) {
    return this.apiRequest<LocationDetails[]>(
      `${API_PATH.AUTOCOMPLETE}`,
      searchValue
    );
  }
}
