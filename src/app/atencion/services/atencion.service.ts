import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionService } from '../../core/services/session.service';

@Injectable({
  providedIn: 'root',
})
export class AtencionService {
  private baseUrl = environment.API_URL;
  constructor(private http: HttpClient, private ss: SessionService) {}

  private getHeaders(): HttpHeaders {
    const token = this.ss.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
  getAll(qs: string = '') {
    const headers = this.getHeaders();
    return this.http.get(`${this.baseUrl}atenciones${qs}`, { headers });
  }

  save(payload: any) {
    const headers = this.getHeaders();
    return this.http.post(`${this.baseUrl}atenciones`, payload, { headers });
  }

  getById(id: number) {
    const headers = this.getHeaders();
    return this.http.get(`${this.baseUrl}atenciones/${id}`, { headers });
  }

  edit(id: number, payload: any) {
    const headers = this.getHeaders();
    return this.http.put(`${this.baseUrl}atenciones/${id}`, payload, { headers });
  }

  delete(id: number) {
    const headers = this.getHeaders();
    return this.http.delete(`${this.baseUrl}atenciones/${id}`, { headers });
  }
}
