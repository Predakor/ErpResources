import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  template: `
    <erp-header />
    <main class="flex flex-col gap-4">
      <router-outlet />
    </main>
  `,
})
export class App {
  protected readonly title = signal('ErpFront');
}
