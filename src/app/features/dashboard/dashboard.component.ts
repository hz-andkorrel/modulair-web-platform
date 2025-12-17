import { Component, inject, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { WidgetsComponent, WidgetDef } from './widgets/widgets.component';
import { TableComponent } from './tables/table.component';
import { PluginsService, Tile } from './services/plugins';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, NgIf, MatGridListModule, MatIconModule, MatButtonModule, MatDialogModule, DragDropModule, TableComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private bp = inject(BreakpointObserver);
  private dialog = inject(MatDialog);
  protected pluginsService = inject(PluginsService);

  cols = signal(3);
  selectedTileId = signal<string | null>(null);

  get tiles() {
    return this.pluginsService.tiles;
  }

  constructor() {
    this.bp
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe((state) => {
        if (state.breakpoints[Breakpoints.XSmall]) this.cols.set(1);
        else if (state.breakpoints[Breakpoints.Small]) this.cols.set(2);
        else if (state.breakpoints[Breakpoints.Medium]) this.cols.set(3);
        else this.cols.set(4);
      });
  }

  private tileCounter = signal(1);

  onAdd(tile: Tile) {
    const ref = this.dialog.open(WidgetsComponent, {
      data: { plugins: [] },
      width: '1440px',
      panelClass: 'widgets-dialog'
    });

    ref.afterClosed().subscribe(result => {
      if (!result) return;
      const { widget } = result as { widget: WidgetDef };
      this.pluginsService.addTile(tile, widget);
    });
  }

  onClear(tile: Tile) {
    this.pluginsService.clearTile(tile);
  }

  onDelete(tile: Tile) {
    this.pluginsService.deleteTile(tile);
    this.selectedTileId.set(null);
  }

  onDrop(event: any) {
    const tiles = this.pluginsService.tiles();
    const movedTile = tiles[event.previousIndex];
    tiles.splice(event.previousIndex, 1);
    tiles.splice(event.currentIndex, 0, movedTile);
    this.pluginsService.tiles.set([...tiles]);
  }
}
