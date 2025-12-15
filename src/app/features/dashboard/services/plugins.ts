import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PluginDef } from '../widgets/widgets.component';
import { plugins as registryPlugins, Plugin } from '../../../shared/registry-data';

@Injectable({
  providedIn: 'root',
})
export class PluginsService {
  plugins = signal<PluginDef[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  constructor(private http: HttpClient) {
    this.loadPlugins();
  }

  loadPlugins() {
    this.loading.set(true);
    this.error.set(null);
    
    // TODO: Replace with actual API endpoint
    // this.http.get<Plugin[]>('/api/plugins').subscribe({
    //   next: (data) => {
    //     this.plugins.set(this.transformPlugins(data));
    //     this.loading.set(false);
    //   },
    //   error: (err) => {
    //     this.error.set(err.message);
    //     this.loading.set(false);
    //   }
    // });

    // Load from registry data and transform
    const transformed = this.transformPlugins(registryPlugins());
    this.plugins.set(transformed);
    this.loading.set(false);
  }

  private transformPlugins(registryPlugins: Plugin[]): PluginDef[] {
    return registryPlugins.map(plugin => ({
      id: plugin.id,
      name: plugin.name,
      widgets: [
        {
          id: plugin.id,
          title: plugin.widget
        }
      ]
    }));
  }
}
