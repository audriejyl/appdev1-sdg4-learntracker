import { Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AboutComponent } from './components/about/about.component';
import { SuppliersListComponent } from './components/suppliers/suppliers-list/suppliers-list.component';
import { SupplierDetailsComponent } from './components/suppliers/supplier-details/supplier-details.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },

  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'about',
    component: AboutComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'suppliers',
    component: SuppliersListComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'suppliers/:id',
    component: SupplierDetailsComponent,
    canActivate: [AuthGuard]
  }
];