import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PluginDef, WidgetDef } from '../widgets/widgets.component';
import { plugins as registryPlugins, Plugin } from '../../../shared/registry-data';
import { TABLE_WIDGET_SIZE } from '../tables/table.component';

export type Tile = {
  id: string;
  colspan: number;
  rowspan: number;
  selectedWidget?: WidgetDef;
};

@Injectable({
  providedIn: 'root',
})
export class PluginsService {
  plugins = signal<PluginDef[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  tiles = signal<Tile[]>([{ id: 'tile-1', colspan: 1, rowspan: 1 }]);
  tileCounter = signal(1);

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

    // Initialize with default widgets on top
    const defaultWidgets = ['licenseplate-plugin', 'mews-plugin', 'key-plugin'];
    const defaultTiles: Tile[] = defaultWidgets
      .map(id => transformed.find(p => p.id === id))
      .filter((p): p is PluginDef => !!p && p.widgets.length > 0)
      .map((p, i) => ({
        id: `tile-${i + 1}`,
        colspan: p.widgets[0].colspan ?? 1,
        rowspan: p.widgets[0].rowspan ?? 1,
        selectedWidget: p.widgets[0]
      }));

    // Add the empty tile at the end
    defaultTiles.push({ id: `tile-${defaultTiles.length + 1}`, colspan: 1, rowspan: 1 } as Tile);
    this.tiles.set(defaultTiles);
    this.tileCounter.set(defaultTiles.length + 1);
  }

  private transformPlugins(registryPlugins: Plugin[]): PluginDef[] {
    return registryPlugins.map(plugin => ({
      id: plugin.id,
      name: plugin.name,
      widgets: [
        {
          id: plugin.id,
          title: plugin.widget,
          type: 'table',
          ...TABLE_WIDGET_SIZE
        }
      ]
    }));
  }

  addTile(tile: Tile, widget: WidgetDef) {
    const newTile: Tile = {
      id: `tile-${this.tileCounter() + 1}`,
      colspan: widget.colspan ?? 1,
      rowspan: widget.rowspan ?? 1,
      selectedWidget: widget
    };
    this.tileCounter.update(c => c + 1);
    this.tiles.update(tiles => [newTile, ...tiles]);
  }

  clearTile(tile: Tile) {
    const next = this.tiles().map(t => t.id === tile.id ? { ...t, selectedWidget: undefined } : t);
    this.tiles.set(next);
  }

  deleteTile(tile: Tile) {
    this.tiles.update(tiles => tiles.filter(t => t.id !== tile.id));
  }
}
