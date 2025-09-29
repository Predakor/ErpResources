import { Component, OnInit } from '@angular/core';
import { routes } from 'app/app.routes';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { User } from '../../shared/components/user/user';
import { toTitleCase } from 'app/shared/utils/stringExtentions';

@Component({
  selector: 'erp-header',
  imports: [User, Menubar],
  template: `
    <header>
      <p-menubar [model]="items">
        <ng-template #end>
          <app-user [name]="'default'" />
        </ng-template>
      </p-menubar>
    </header>
  `,
})
export class Header {
  appRoutes = routes;
  items: MenuItem[] = this.appRoutes.map((route) => ({
    label: toTitleCase(route.path || 'Home'),
    routerLink: route.path,
  }));
}
