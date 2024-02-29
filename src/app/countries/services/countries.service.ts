import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { Observable, catchError, of } from "rxjs";
import { Country } from "../interfaces/country";

@Injectable({ providedIn: 'root'})
export class CountriesService {

    private apiUrl: string = 'https://restcountries.com/v3.1'

    constructor( private http: HttpClient){}

    searchCountryByAlphaCode( code: string ): Observable<Country[]> {
        const url = `${this.apiUrl}/alpha/${code}`;
        return this.http.get<Country[]>( url )
            .pipe(
                catchError(() => of([]))
            )
    }

    searchCapital( capital: string ): Observable<Country[]> {
        const url = `${this.apiUrl}/capital/${capital}`;
        return this.http.get<Country[]>( url )
            .pipe(
                catchError(() => of([]))
            )
    }

    searchCountry( country: string ): Observable<Country[]> {
        const url = `${this.apiUrl}/name/${country}`;
        return this.http.get<Country[]>(url)
            .pipe(
                catchError(() => of([]))
            )
    }

    searchRegion( region: string ): Observable<Country[]> {
        const url = `${this.apiUrl}/region/${region}`;
        return this.http.get<Country[]>(url)
            .pipe(
                catchError(() => of([]))
            )
    }

}