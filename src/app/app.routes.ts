import { Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AboutComponent } from './components/about/about.component';
import { SuppliersListComponent } from './components/suppliers/suppliers-list/suppliers-list.component';
import { SupplierDetailsComponent } from './components/suppliers/supplier-details/supplier-details.component';
import { authGuard, canDeactivateGuard } from './guards';

export const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },

  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard]
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    canDeactivate: [canDeactivateGuard]
  },

  {
    path: 'about',
    component: AboutComponent,
    canActivate: [authGuard]
  },

  {
    path: 'suppliers',
    component: SuppliersListComponent,
    canActivate: [authGuard]
  },

  {
    path: 'suppliers/:id',
    component: SupplierDetailsComponent,
    canActivate: [authGuard],
    canDeactivate: [canDeactivateGuard]
  },

  // Wildcard route - must be last
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];