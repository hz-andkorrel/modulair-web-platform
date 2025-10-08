import { Component, inject, signal } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AddWidgetDialogComponent } from './widgets/add-widget.dialog';
import { PLUGINS } from './widgets/registry';
import { WidgetDef } from './widgets/types';
import { MatDialog } from '@angular/material/dialog';

type Tile = { 
  id: string;
  colspan: number;
  rowspan: number;
  selectedWidget?: WidgetDef;};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, MatGridListModule, MatIconModule, MatButtonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent {
  private bp = inject(BreakpointObserver);
  private dialog = inject(MatDialog);

  cols = signal(4);

  tiles = signal<Tile[]>([
    { id: 'tile-1', colspan: 1, rowspan: 1 },
    { id: 'tile-2', colspan: 1, rowspan: 1 },
    { id: 'tile-3', colspan: 1, rowspan: 1 },
    { id: 'tile-4', colspan: 1, rowspan: 1 },
    { id: 'tile-5', colspan: 2, rowspan: 1 }, 
    { id: 'tile-6', colspan: 2, rowspan: 2 }, 
  ]);

  constructor() {
    this.bp.observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
      .subscribe(state => {
        if (state.breakpoints[Breakpoints.XSmall]) this.cols.set(1);
        else if (state.breakpoints[Breakpoints.Small]) this.cols.set(2);
        else if (state.breakpoints[Breakpoints.Medium]) this.cols.set(3);
        else this.cols.set(4);
      });
  }

  onAdd(tile: Tile) {
  const ref = this.dialog.open(AddWidgetDialogComponent, {
    data: { plugins: PLUGINS },
    width: '1440px',
    panelClass: 'widgets-dialog'
  }); 

    ref.afterClosed().subscribe(result => {
      if (!result) return;
      const { widget } = result as { widget: WidgetDef };
      // schrijf de selectie in dit vak
      const next = this.tiles().map(t => t.id === tile.id ? { ...t, selectedWidget: widget } : t);
      this.tiles.set(next);
    });
  }

  onClear(tile: Tile) {
    const next = this.tiles().map(t => t.id === tile.id ? { ...t, selectedWidget: undefined } : t);
    this.tiles.set(next);
  }
}
