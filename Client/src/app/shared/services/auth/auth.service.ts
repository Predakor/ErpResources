import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { TokenService } from 'app/shared/services/token/token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api = inject(HttpClient);
  private token = inject(TokenService);

  getToken = () => this.token.get()?.accessToken;

  me() {}

  login(credentials: Credentials) {
    return this.api.post<JWTToken>('login', credentials).subscribe({
      next: (res) => {
        this.token.set(res);
      },
      error: (err) => console.error(err),
    });
  }

  logout() {
    this.token.clear();
  }

  refresh = async () => {
    //refresh token
    //set properties
    //return something onSucces
    return true as unknown as JWTToken;
  };

  register(credentials: Credentials) {
    return this.api.post('register', credentials);
  }

  isLoged = async () => {
    const accesToken = this.token.get();

    if (!accesToken) {
      return false;
    }

    if (this.token.isExpired()) {
      const newToken = await this.refresh();
      this.token.set(newToken);
      return true;
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
