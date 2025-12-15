import { Component, inject, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { WidgetsComponent, WidgetDef } from './widgets/widgets.component';
import { TableComponent } from './tables/table.component';

type Tile = {
  id: string;
  colspan: number;
  rowspan: number;
  selectedWidget?: WidgetDef;
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, NgIf, MatGridListModule, MatIconModule, MatButtonModule, MatDialogModule, TableComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private bp = inject(BreakpointObserver);
  private dialog = inject(MatDialog);

  cols = signal(3);

  tiles = signal<Tile[]>([
    { id: 'tile-1', colspan: 1, rowspan: 1 },
  ]);

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
      const newTile: Tile = {
        id: `tile-${this.tileCounter() + 1}`,
        colspan: widget.colspan ?? 1,
        rowspan: widget.rowspan ?? 1,
        selectedWidget: widget
      };
      this.tileCounter.update(c => c + 1);
      this.tiles.update(tiles => [...tiles, newTile]);
    });
  }

  onClear(tile: Tile) {
    const next = this.tiles().map(t => t.id === tile.id ? { ...t, selectedWidget: undefined } : t);
    this.tiles.set(next);
  }
}
