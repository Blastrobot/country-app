import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { Observable, catchError, delay, map, of, tap } from "rxjs";
import { Country } from "../interfaces/country.interface";
import { CacheStore } from "../interfaces/cache-store.interface";
import { Region } from "../interfaces/regions.type";

@Injectable({ providedIn: 'root'})
export class CountriesService {

    private apiUrl: string = 'https://restcountries.com/v3.1';

    public cacheStore: CacheStore = {
        byCapital: { term: '', countries: [] },
        byCountries: { term: '', countries: [] },
        byRegion: { region: '', countries: [] },
    }

    constructor( private http: HttpClient){}

    private getCountriesRequest(url: string): Observable<Country[]> {
        return this.http.get<Country[]>( url )
            .pipe(
                catchError(() => of([])),
                // delay(2000),
            )
    };

    searchCountryByAlphaCode( code: string ): Observable<Country | null> {
        const url = `${this.apiUrl}/alpha/${code}`;
        return this.http.get<Country[]>( url )
            .pipe(
                map( countries => countries.length > 0 ? countries[0] : null),
                catchError(() => of(null))
            )
    };

    searchCapital( capital: string ): Observable<Country[]> {
        const url = `${this.apiUrl}/capital/${capital}`;
        return this.getCountriesRequest(url)
            .pipe(
                tap( countries => this.cacheStore.byCapital = { term: capital, countries: countries })
            )
    };

    searchCountry( country: string ): Observable<Country[]> {
        const url = `${this.apiUrl}/name/${country}`;
        return this.getCountriesRequest(url)
            .pipe(
                tap( countries => this.cacheStore.byCountries = { term: country, countries: countries })
            )
    }

    searchRegion( region: Region ): Observable<Country[]> {
        const url = `${this.apiUrl}/region/${region}`;
        return this.getCountriesRequest(url)
            .pipe(
                tap( countries => this.cacheStore.byRegion = { region: region, countries: countries})
            )
    }

}