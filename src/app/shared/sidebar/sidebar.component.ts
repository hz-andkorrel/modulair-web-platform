import { categories, plugins, Plugin } from '../registry-data';
import { Component, inject, computed, signal } from '@angular/core';
// ...existing imports...
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterModule,
    MatSidenavModule,
    MatToolbarModule, 
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatTooltipModule,
    MatMenuModule,
    MatDividerModule,
    CommonModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  registryPlugins = plugins;
  private router = inject(Router);
  authService = inject(AuthService);
  expandedCategories: Set<string> = new Set();
  registryCategories = categories;
  
  getPluginsByCategory(category: string): Plugin[] {
    return this.registryPlugins().filter((p: Plugin) => p.category === category);
  }

  // Signal to track route
  private currentRoute = signal('/dashboard');
  
  pageTitle = computed(() => {
    const route = this.currentRoute();
    switch (route) {
      case '/registry':
        return 'Registry';
      case '/settings':
        return 'Settings';
      default:
        return 'Dashboard';
    }
  });

  constructor() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute.set(event.url);
      });
    
    this.currentRoute.set(this.router.url);
  }

  toggleCategory(categoryId: string): void {
    if (this.expandedCategories.has(categoryId)) {
      this.expandedCategories.delete(categoryId);
    } else {
      this.expandedCategories.add(categoryId);
    }
  }

  isExpanded(categoryId: string): boolean {
    return this.expandedCategories.has(categoryId);
  }

  goHome(): void {
    this.router.navigate(['']);
  }

  goRegistry(): void {
    this.router.navigate(['/registry']);
  }

  goSettings(): void {
    this.router.navigate(['/settings']);
  }

  logout(): void {
    this.authService.logout();
  }

  goProfile(): void {
  }
}