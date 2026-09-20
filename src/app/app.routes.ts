import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'password',
    loadComponent: () => import('./reset-password/reset-password').then((m) => m.ResetPassword),
  },
  {
    path: 'email',
    loadComponent: () => import('./email-change/email-change').then((m) => m.EmailChange),
  },
];
