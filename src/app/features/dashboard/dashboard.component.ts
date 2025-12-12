import { Component, inject, signal } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

type Tile = {
  id: string;
  colspan: number;
  rowspan: number;
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, MatGridListModule, MatIconModule, MatDialogModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private bp = inject(BreakpointObserver);

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
}
