import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { ButtonComponent } from './components/button/button.component';
import { SearchComponent } from './components/search/search.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { HomeComponent } from './pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { CardComponent } from './components/card/card.component';
import { MatCommonModule } from '@angular/material/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { WeatherService } from './services/weather.service';
import { TitleComponent } from './components/title/title.component';
import { CityCardComponent } from './components/city-card/city-card.component';
import { DailyCardComponent } from './pages/home/daily-card/daily-card.component';
import { FiveDayForecastComponent } from './pages/home/five-day-forecast/five-day-forecast.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    FavoritesComponent,
    HomeComponent,
    HeaderComponent,
    CardComponent,
    TitleComponent,
    CityCardComponent,
    DailyCardComponent,
    FiveDayForecastComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {}),
    BrowserAnimationsModule,
    MatButtonModule,
    MatDividerModule,
    SearchComponent,
    MatCommonModule,
    MatAutocompleteModule,
    FontAwesomeModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatMenuModule,
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent],
})
export class AppModule {}
