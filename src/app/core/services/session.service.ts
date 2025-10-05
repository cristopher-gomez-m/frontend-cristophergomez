import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private tokenKey = 'auth_token';
  private token: string | null = null;
  public isLoggedIn = signal<boolean>(false);

  constructor() {
    const savedToken = localStorage.getItem(this.tokenKey);
    if (savedToken) {
      this.token = savedToken;
    }
  }

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem(this.tokenKey, token);
    this.isLoggedIn.set(true);
  }

  getToken(): string | null {
    return this.token || localStorage.getItem(this.tokenKey);
  }

  clearToken(): void {
    this.token = null;
    localStorage.removeItem(this.tokenKey);
    this.isLoggedIn.set(false);
  }

}
