import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api = inject(HttpClient);
  private token: JWTToken | undefined | null;
  private expiresAt: Date | undefined | null;
  me() {}

  login(credentials: Credentials) {
    return this.api.post<JWTToken>('login', credentials).subscribe({
      next: (res) => {
        this.token = res;
        const exp = Date.now() + res.expiresIn * 1000;
        this.expiresAt = new Date(exp);

        setTimeout(() => {
          console.log('refreshing token');
        }, res.expiresIn * 1000);
      },
      error: (err) => console.error(err),
    });
  }

  logout() {}

  refresh = async () => {
    //refresh token
    //set properties
    //return something onSucces
    return true;
  };

  register(credentials: Credentials) {
    return this.api.post('register', credentials);
  }

  isLoged = async () => {
    if (!this.token || !this.expiresAt) {
      return false;
    }

    if (this.expiresAt.getMilliseconds() < Date.now()) {
      return await this.refresh();
    }

    return true;
  };
}

export type Credentials = {
  email: string;
  password: string;
};
export interface JWTToken {
  tokenType: string;
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
}
