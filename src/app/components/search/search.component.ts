import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { concatAll, map, debounceTime } from 'rxjs/operators';
import { NgFor, AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { WeatherService } from 'src/app/services/weather.service';
import { LocationDetails } from 'src/app/services/response';
import { LocationService } from 'src/app/services/location.service';
import { Router } from '@angular/router';

type City = Pick<LocationDetails, 'Key' | 'LocalizedName'>;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    NgFor,
    AsyncPipe,
  ],
})
export class SearchComponent implements OnInit {
  searchControl = new FormControl('');
  options: any[] = [];
  filteredOptions: Observable<City[]>;

  constructor(
    private weatherApiService: WeatherService,
    private locationService: LocationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      map((value) => this.filter(value || '')),
      concatAll()
    );
  }

  public onSelect(option: City) {
    this.locationService.changeCity({
      id: Number(option.Key),
      name: option.LocalizedName,
    });

    this.router.navigate(['home']);
  }

  public autocompleteDisplay(value: City) {
    return value.LocalizedName;
  }

  filter(value: string | City) {
    if (typeof value !== 'string') {
      value = value.LocalizedName;
    }

    const filterValue = value.toLowerCase();

    return this.weatherApiService
      .getSearchedResults(filterValue)
      .pipe(
        map((data) =>
          data.map(
            (option) =>
              <City>{ Key: option.Key, LocalizedName: option.LocalizedName }
          )
        )
      );
  }
}
