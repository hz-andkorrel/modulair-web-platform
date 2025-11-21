import { Component } from '@angular/core';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-plugin-mews',
  imports: [MatDivider],
  template: `
    <mat-divider />
    <iframe 
      src="http://localhost:8080/render"
      style="width: 100%; height: calc(100vh - 1px); border: none;">
    </iframe>
  `,
  styles: [`
    .plugin-container {
      padding: 20px;
    }
    h1 {
      color: #333;
      margin-bottom: 16px;
    }
    p {
      color: #666;
      line-height: 1.5;
    }
  `]
})
export class PluginMewsComponent {}