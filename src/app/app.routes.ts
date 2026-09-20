import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'reset-password',
    loadComponent: () => import('./reset-password/reset-password').then((m) => m.ResetPassword),
  },
  {
    path: 'email-change',
    loadComponent: () => import('./email-change/email-change').then((m) => m.EmailChange),
  },
];
