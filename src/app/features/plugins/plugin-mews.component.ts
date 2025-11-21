import { Component } from '@angular/core';

@Component({
  selector: 'app-plugin-mews',
  template: `
    <iframe 
      src="http://localhost:8080/render"
      style="width: 100%; height: 100vh; border: none;">
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