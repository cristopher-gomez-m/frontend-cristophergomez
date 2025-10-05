import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private baseUrl = environment.API_URL;
  constructor(private http: HttpClient) {}

  async login(payload: any): Promise<any> {
    return await firstValueFrom(
      this.http.post(`${this.baseUrl}login`, payload)
    );
  }

  async register(payload: any) {
    return await firstValueFrom(
      this.http.post(`${this.baseUrl}register`, payload)
    );
  }
}
