import { Routes } from '@angular/router';
import { AUTH_ROUTES } from './auth/auth-router';
import { MAIN_ROUTES } from './main/main-router';

export const routes: Routes = [
  { path: '', children: AUTH_ROUTES },
  { path: '', children: MAIN_ROUTES },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' },
];
