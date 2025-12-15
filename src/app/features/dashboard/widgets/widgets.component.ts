import { Component, Inject, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PluginsService } from '../services/plugins';

export interface PluginDef {
  id: string;
  name: string;
  widgets: WidgetDef[];
}

export interface WidgetDef {
  id: string;
  title: string;
  description?: string;
}

export interface AddWidgetData {
  plugins: PluginDef[];
}

@Component({
  selector: 'app-widgets',
  standalone: true,
  imports: [
    MatDialogModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatExpansionModule, MatCardModule,
    NgFor, NgIf, FormsModule
  ],
  templateUrl: './widgets.component.html',
  styleUrl: './widgets.component.scss',
})
export class WidgetsComponent {
  pluginsService = inject(PluginsService);
  plugins = this.pluginsService.plugins;
  loading = this.pluginsService.loading;
  error = this.pluginsService.error;
  query = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AddWidgetData,
    private ref: MatDialogRef<WidgetsComponent>
  ) {}

  filter(list: WidgetDef[]) {
    const q = this.query.trim().toLowerCase();
    return q ? list.filter(w => w.title.toLowerCase().includes(q)) : list;
  }

  choose(plugin: PluginDef, widget: WidgetDef) {
    this.ref.close({ pluginId: plugin.id, widget });
  }
}
