import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-plugin-mews',
  template: `
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
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PluginMewsComponent {}