import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { WidgetDef } from '../widgets/widgets.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  widget = input.required<WidgetDef>();
  close = output<void>();

  onClose() {
    this.close.emit();
  }
}
