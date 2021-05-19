import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { endpoints } from 'utilities/endpoints';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient) {}

  async join(payload: any): Promise<Observable<any>> {
    return await this._http.post<any>(
      `${environment.API_URL}/${endpoints.join}`,
      payload
    );
  }
}
