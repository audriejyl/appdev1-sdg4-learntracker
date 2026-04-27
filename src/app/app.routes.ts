import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SuppliersListComponent } from './components/suppliers/suppliers-list/suppliers-list.component';
import { SupplierDetailsComponent } from './components/suppliers/supplier-details/supplier-details.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },

  { path: 'home', component: HomeComponent },

  { path: 'about', component: AboutComponent },

  { path: 'dashboard', component: DashboardComponent },

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