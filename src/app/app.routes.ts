import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth-module').then((m) => m.AuthModule),
  },
  {
    path: 'cliente',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./cliente/cliente-module').then((m) => m.ClienteModule),
  },
  {
    path: 'cita',
    canActivate: [authGuard],
    loadChildren: () => import('./cita/cita-module').then((m) => m.CitaModule),
  },
  {
    path: 'atencion',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./atencion/atencion-module').then((m) => m.AtencionModule),
  },
];
