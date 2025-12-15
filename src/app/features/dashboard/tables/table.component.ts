import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { WidgetDef } from '../widgets/widgets.component';

export const TABLE_WIDGET_SIZE = {
  colspan: 1,
  rowspan: 2
};

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

  size = computed(() => TABLE_WIDGET_SIZE);

  onClose() {
    this.close.emit();
  }
}
