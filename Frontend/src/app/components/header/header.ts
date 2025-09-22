import { Component } from '@angular/core';
import { User } from '../user/user';
import { RouterLink } from '@angular/router';
import { routes } from 'app/app.routes';

@Component({
  selector: 'erp-header',
  imports: [User, RouterLink],
  template: `
    <header>
      <h1>Logo</h1>
      <app-user [name]="'default'" />
      <nav>
        <ul class="navigation">
          @for (route of appRoutes; track $index) {
          <li routerLink="{{ route.path }}">{{ route.path || 'Home' }}</li>
          }
        </ul>
      </nav>
    </header>
  `,
  styles: `
    .navigation {
      display: flex;
      gap: 2rem;
    }
  `,
})
export class Header {
  appRoutes = routes;
}
