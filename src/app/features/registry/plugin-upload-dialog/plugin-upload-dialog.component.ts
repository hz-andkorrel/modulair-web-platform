import { Component, signal } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-plugin-upload-dialog',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatCardModule, DragDropModule, MatListModule, CommonModule],
  templateUrl: './plugin-upload-dialog.component.html',
  styleUrl: './plugin-upload-dialog.component.scss'
})
export class PluginUploadDialogComponent {
  selectedFile = signal<File | null>(null);

  constructor(public dialogRef: MatDialogRef<PluginUploadDialogComponent>) {}

  onPluginUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file.name.endsWith('.zip')) {
        this.selectedFile.set(file);
      }
    }
  }

  onUpload() {
    const file = this.selectedFile();
    if (file) {
      this.dialogRef.close(file);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  onRemoveFile() {
    this.selectedFile.set(null);
  }
}

