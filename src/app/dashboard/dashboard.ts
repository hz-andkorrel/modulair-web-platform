import { Component, inject, signal } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

type Tile = { id: string; colspan: number; rowspan: number; };

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, MatGridListModule, MatIconModule, MatButtonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent {
  private bp = inject(BreakpointObserver);

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
    // Voor nu alleen placeholder-actie
    console.log('Klik op lege tegel om widget toe te voegen:', tile);
    // Hier komt later: dialoog openen / widget kiezen / opslaan
  }
}
