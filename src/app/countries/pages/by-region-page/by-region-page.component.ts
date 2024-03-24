import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

type Regions = 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania';

@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent {

  public countries: Country[] = [];
  public regions: Regions[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?: Regions;

  constructor( private countriesService: CountriesService ) {}

  searchByRegion( region: Regions ) {

    this.selectedRegion = region;
    console.log('From region page: ', region);
    this.countriesService.searchRegion(region)
      .subscribe(countries => {
        this.countries = countries;
      })
  }

}
