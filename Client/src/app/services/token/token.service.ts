import { Injectable } from '@angular/core';
import { JWTToken } from '@services/auth/auth.service';

const tokenKey = 'authKey';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private token: JWTToken | undefined;
  private expiresAt: Date | undefined;

  isExpired() {
    if (!this.expiresAt || !this.token) {
      return true;
    }
    return Date.now() > this.expiresAt.getTime();
  }

  set(token: JWTToken) {
    this.token = token;

    const tokenExpiresInMs = token.expiresIn * 1000;
    this.expiresAt = new Date(Date.now() + tokenExpiresInMs);

    sessionStorage.setItem(tokenKey, JSON.stringify(token));

    setTimeout(() => {
      console.log('refreshing token');
    }, tokenExpiresInMs);
  }

  get() {
    if (this.token && !this.isExpired()) {
      return this.token;
    }

    const storedToken = sessionStorage.getItem(tokenKey);
    if (storedToken) {
      const parsedToken = JSON.parse(storedToken) as JWTToken;
      this.set(parsedToken);
      return parsedToken;
    }

    return null;
  }

  clear() {
    this.token = undefined;
    this.expiresAt = undefined;
    sessionStorage.removeItem(tokenKey);
  }
}
