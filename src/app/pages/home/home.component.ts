import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../../environment/enviroment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public currentWeather: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getCurrentWeather();
  }

  public getCurrentWeather() {
    const params = new HttpParams({}).set('apikey', environment.apiKey);

    this.http
      .get('http://dataservice.accuweather.com/currentconditions/v1/215854', {
        params,
      })
      .subscribe((data) => {
        console.log(data);
        this.currentWeather = data;
      });
  }
}
