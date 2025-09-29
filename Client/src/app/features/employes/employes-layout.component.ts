import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { employeRoutes } from './employe.routes';
import { Menubar } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { toTitleCase } from 'app/shared/utils/stringExtentions';

@Component({
  selector: 'erp-employes-layout',
  imports: [RouterOutlet, Menubar],
  template: `
    <h2 class="text-3xl">Employe Manager</h2>
    <nav>
      <p-menubar [model]="items"></p-menubar>
    </nav>
    <router-outlet> </router-outlet>
  `,
})
export class EmployesLayout {
  items: MenuItem[] = employeRoutes.map((route) => ({
    label: toTitleCase(route.path || 'Home'),
    routerLink: route.path,
  }));
}
