import { Component, Inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PluginDef, WidgetDef } from './types';

export interface AddWidgetData {
  plugins: PluginDef[];
}

@Component({
  selector: 'bb-add-widget-dialog',
  standalone: true,
  imports: [
    MatDialogModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatExpansionModule, MatCardModule,
    NgFor, NgIf, FormsModule
  ],
  template: `
    <div class="sheet">
      <!-- Header -->
      <div class="header">
        <span class="pill">widgets</span>

        <mat-form-field appearance="outline" class="search">
          <mat-label>zoeken</mat-label>
          <input matInput [(ngModel)]="query" placeholder="Zoek widget..." />
          <button mat-icon-button matSuffix aria-label="zoeken">
            <mat-icon>search</mat-icon>
          </button>
        </mat-form-field>
      </div>

      <!-- Body: lijst met uitklapbare plugin-balken -->
      <div class="body">
        <mat-accordion multi>
          <mat-expansion-panel
            class="plugin-panel"
            *ngFor="let p of data.plugins">

            <!-- Balk met plugin-naam -->
            <mat-expansion-panel-header>
              <div class="plugin-bar">
                <div class="plugin-title">{{ p.name }}</div>
                <mat-icon class="arrow" svgIcon=""></mat-icon>
              </div>
            </mat-expansion-panel-header>

            <!-- Open toestand: rij met 3 widget-previews -->
            <div class="widget-row">
              <mat-card class="widget-card"
                        *ngFor="let w of filter(p.widgets)"
                        (click)="choose(p, w)">
                <div class="preview-box"></div>
                <div class="meta">
                  <div class="w-title">{{ w.title }}</div>
                  <div class="w-desc" *ngIf="w.description">{{ w.description }}</div>
                </div>
                <div class="actions">
                  <button mat-stroked-button color="primary">
                    <mat-icon>add</mat-icon>
                    Toevoegen
                  </button>
                </div>
              </mat-card>

              <p *ngIf="filter(p.widgets).length === 0" class="empty">
                Geen widgets gevonden voor deze plugin
              </p>
            </div>
          </mat-expansion-panel>
        </mat-accordion>
      </div>

      <div class="footer">
        <button mat-button mat-dialog-close>Annuleren</button>
      </div>
    </div>
  `,
  styles: [`
    .sheet {
      display: grid;
      grid-template-rows: auto 1fr auto;
      min-height: 560px;
      background: #fff;
      border: 1px solid rgba(0,0,0,.08);
      border-radius: 24px;
      box-shadow: 0 8px 24px rgba(0,0,0,.08);
      overflow: hidden;
    }

    .header {
      display: grid;
      grid-template-columns: 1fr 320px;
      gap: 12px;
      align-items: center;
      padding: 12px 16px;
      background: #fafafa;
      border-bottom: 1px solid rgba(0,0,0,.06);
    }
    .pill {
      display:inline-block; background:#eee; border-radius:12px;
      padding:4px 10px; font-weight:700; font-size:13px;
    }
    .search { width:100%; }

    .body {
        flex: 1;
        overflow-y: auto;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        background: #fff;
     }


    .plugin-panel {
      border-radius: 12px !important;
      margin-bottom: 12px;
      border: 1px solid rgba(0,0,0,.10);
      overflow: hidden;
    }
    .plugin-bar {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr auto;
      align-items: center;
      padding: 8px 12px;
      border-bottom: 1px solid rgba(0,0,0,.06);
      border-top-left-radius: 12px;
      border-top-right-radius: 12px;
    }
    .plugin-title { font-weight: 700; }

    .widget-row {
      padding: 12px;
      display: grid;
      grid-template-columns: repeat(3, minmax(0,1fr));  /* 3 per rij */
      gap: 12px;
    }

    .widget-card {
      display: grid;
      grid-template-rows: 120px auto auto;
      gap: 8px;
      border-radius: 12px;
      cursor: pointer;
    }
    .widget-card:hover { box-shadow: 0 3px 10px rgba(0,0,0,.06); }

    .preview-box {
      background: #f6f7f9;
      border: 2px solid rgba(0,0,0,.12);
      border-radius: 12px;
    }
    .meta .w-title { font-weight: 600; }
    .meta .w-desc { font-size: 12px; opacity: .75; }
    .actions { display:flex; justify-content:flex-end; }

    .empty { grid-column: 1 / -1; text-align: center; opacity: .65; }

    .footer { padding: 10px 16px; border-top: 1px solid rgba(0,0,0,.06); }

    @media (max-width: 900px) {
      .sheet { min-width: 0; }
      .header { grid-template-columns: 1fr; }
      .widget-row { grid-template-columns: 1fr; }
    }
  `]
})
export class AddWidgetDialogComponent {
  query = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AddWidgetData,
    private ref: MatDialogRef<AddWidgetDialogComponent>
  ) {}

  filter(list: WidgetDef[]) {
    const q = this.query.trim().toLowerCase();
    return q ? list.filter(w => w.title.toLowerCase().includes(q)) : list;
  }

  choose(plugin: PluginDef, widget: WidgetDef) {
    this.ref.close({ pluginId: plugin.id, widget });
  }
}
