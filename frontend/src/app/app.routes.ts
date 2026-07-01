import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register').then((m) => m.RegisterComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard/dashboard').then((m) => m.Dashboard),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./features/dashboard/home/home').then((m) => m.Home),
      },
      {
        path: 'jobs',
        loadComponent: () =>
          import('./features/jobs/jobs').then((m) => m.Jobs).catch(() => {
            // placeholder — create the component later
            return { Jobs: class {} } as any;
          }),
      },
      {
        path: 'resume',
        loadComponent: () =>
          import('./features/resume/resume').then((m) => m.Resume).catch(() => {
            return { Resume: class {} } as any;
          }),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./features/profile/profile').then((m) => m.Profile).catch(() => {
            return { Profile: class {} } as any;
          }),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./features/settings/settings').then((m) => m.Settings).catch(() => {
            return { Settings: class {} } as any;
          }),
      },
    ],
  },
];
