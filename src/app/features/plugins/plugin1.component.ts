import { Component } from '@angular/core';

@Component({
  selector: 'app-plugin1',
  template: `
    <div class="plugin-container">
      <h1>Plugin 1</h1>
      <p>Welcome to Plugin 1 page!</p>
      <p>This is where Plugin 1 functionality would be implemented.</p>
    </div>
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
export class Plugin1Component {}