import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

export type Credentials = {
  email: string;
  password: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api = inject(HttpClient);

  me() {}

  login(credentials: Credentials) {
    return this.api.post('login', credentials);
  }

  logout() {}

  register(credentials: Credentials) {
    return this.api.post('register', credentials);
  }
}
