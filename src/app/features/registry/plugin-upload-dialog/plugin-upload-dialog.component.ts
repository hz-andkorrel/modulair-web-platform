import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-plugin-upload-dialog',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatCardModule, DragDropModule],
  templateUrl: './plugin-upload-dialog.component.html',
  styleUrl: './plugin-upload-dialog.component.scss'
})
export class PluginUploadDialogComponent {
  constructor(public dialogRef: MatDialogRef<PluginUploadDialogComponent>) {}

  onPluginUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file.name.endsWith('.zip')) {
        this.dialogRef.close(file);
      }
    }
  }
}

