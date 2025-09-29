import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth-guard';
import { employeRoutes } from 'app/features/employes/employe.routes';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./features/home/home.component').then((r) => r.HomePage),
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then((r) => r.Login),
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register').then((r) => r.Register),
  },
  {
    path: 'shifts',
    loadComponent: () => import('./features/shifts/shifts.page').then((r) => r.ShiftsPage),
    canActivate: [authGuard],
  },
  {
    path: 'employes',
    loadComponent: () =>
      import('./features/employes/employes-layout.component').then((r) => r.EmployesLayout),

    canActivate: [authGuard],
    children: employeRoutes,
  },
];
