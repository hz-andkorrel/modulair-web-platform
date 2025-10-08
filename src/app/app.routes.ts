import { Routes } from '@angular/router';
import { Plugin1Component } from './features/plugins/plugin1.component';
import { RegistryComponent } from './features/registry/registry.component';
import { SettingsComponent } from './features/settings/settings.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', loadComponent: () => import('./dashboard/dashboard').then(m => m.DashboardComponent) },
  //{ path: '', redirectTo: '/plugin1', pathMatch: 'full' },
  { path: 'registry', component: RegistryComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'plugin1', component: Plugin1Component },
  { path: '**', redirectTo: '/plugin1' } // Wildcard route for 404 cases
];
