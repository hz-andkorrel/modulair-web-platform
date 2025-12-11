import { Routes } from '@angular/router';
import { PluginMewsComponent } from './features/plugins/plugin-mews.component';
import { PluginKeyComponent } from './features/plugins/plugin-key.component';
import { PluginCarparkComponent } from './features/plugins/plugin-carpark.component';
import { RegistryComponent } from './features/registry/registry.component';
import { SettingsComponent } from './features/settings/settings.component';
import { authGuard } from './core/guards/auth.guard';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

export const routes: Routes = [
  // Auth routes without sidebar (public routes)
  { path: 'login', loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent) },
  { path: 'forgot-password', loadComponent: () => import('./features/auth/forgot-password/forgot-password').then(m => m.ForgotPasswordComponent) },
  { path: 'reset-password', loadComponent: () => import('./features/auth/reset-password/reset-password').then(m => m.ResetPasswordComponent) },

  // Protected routes with sidebar
  {
    path: '',
    component: SidebarComponent,
    canActivate: [authGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', loadComponent: () => import('./dashboard/dashboard').then(m => m.DashboardComponent) },
      { path: 'registry', component: RegistryComponent },
      { path: 'registry/mews-plugin', component: PluginMewsComponent },
      { path: 'registry/key-plugin', component: PluginKeyComponent },
      { path: 'registry/licenseplate-plugin', component: PluginCarparkComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'plugin-mews', component: PluginMewsComponent },
      { path: 'plugin-car-park', component: PluginCarparkComponent },
    ]
  },
  { path: '**', redirectTo: '/login' }
];
 