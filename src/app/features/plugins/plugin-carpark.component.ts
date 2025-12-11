import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-plugin-carpark',
  imports: [MatDivider],
  template: `
    <mat-divider />
    <iframe 
      src="http://localhost:9002/render"
      style="width: 100%; height: calc(100vh - 1px); border: none;">
    </iframe>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PluginCarparkComponent {}
