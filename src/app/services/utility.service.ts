import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  constructor(private http: HttpClient) {}

  getCountries(): Observable<any> {
    return this.http.get<any>('assets/json/countries.json');
  }
}
