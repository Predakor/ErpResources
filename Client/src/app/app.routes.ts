import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: async () => {
      const m = await import('./pages/home/home');
      return m.Home;
    },
  },
  {
    path: 'login',
    loadComponent: async () => {
      const m = await import('./pages/auth/login/login');
      return m.Login;
    },
  },
  {
    path: 'register',
    loadComponent: () => {
      return import('./pages/auth/register/register').then((r) => r.Register);
    },
  },
];
