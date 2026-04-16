import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'about' },
  {
    path: 'about',
    loadComponent: () => import('./about/about.component').then((m) => m.AboutComponent)
  }
];
