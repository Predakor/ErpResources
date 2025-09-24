import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

type Credentials = {
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
    this.api.post('login', credentials).subscribe((r) => console.log(r));
  }

  logout() {}

  register(credentials: Credentials) {
    this.api.post('register', credentials).subscribe((r) => console.log(r));
  }
}
