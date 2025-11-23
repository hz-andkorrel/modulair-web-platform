import { Routes } from '@angular/router';
import { PluginMewsComponent } from './features/plugins/plugin-mews.component';
import { PluginKeyComponent } from './features/plugins/plugin-key.component';
import { RegistryComponent } from './features/registry/registry.component';
import { SettingsComponent } from './features/settings/settings.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', loadComponent: () => import('./dashboard/dashboard').then(m => m.DashboardComponent) },
  //{ path: '', redirectTo: '/plugin1', pathMatch: 'full' },
  { path: 'registry', component: RegistryComponent },
  { path: 'registry/mews-plugin', component: PluginMewsComponent },
  { path: 'registry/key-plugin', component: PluginKeyComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'plugin-mews', component: PluginMewsComponent },
  { path: '**', redirectTo: '/dashboard' } // Wildcard route for 404 cases
];
