import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoints } from 'utilities/endpoints';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient) {}

  async join(payload: any): Promise<Observable<any>> {
    return await this._http.post<any>(`/${endpoints.join}`, payload);
  }
}
