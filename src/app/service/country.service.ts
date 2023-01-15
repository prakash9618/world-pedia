import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http:HttpClient) { }

  getCountries(){
    return this.http.get(`${environment.baseUrl}/all`);
  }

  searchCountry(searchItem:any){
    return this.http.get(`${environment.baseUrl}/name/`+searchItem);
  }
}
