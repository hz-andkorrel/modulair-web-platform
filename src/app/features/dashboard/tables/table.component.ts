import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
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
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  widget = input.required<WidgetDef>();
  close = output<void>();

  size = computed(() => TABLE_WIDGET_SIZE);

  displayedColumns: string[] = ['column1', 'column2', 'column3'];
  dataSource = [
    { column1: 'Data 1', column2: 'Data 2', column3: 'Data 3' },
    { column1: 'Data 4', column2: 'Data 5', column3: 'Data 6' },
    { column1: 'Data 7', column2: 'Data 8', column3: 'Data 9' }
  ];

  onClose() {
    this.close.emit();
  }
}
