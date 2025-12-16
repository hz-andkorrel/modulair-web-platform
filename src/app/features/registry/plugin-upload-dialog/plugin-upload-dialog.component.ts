import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-plugin-upload-dialog',
  standalone: true,
  templateUrl: './plugin-upload-dialog.component.html',
  styleUrl: './plugin-upload-dialog.component.scss'
})
export class PluginUploadDialogComponent {
  constructor(public dialogRef: MatDialogRef<PluginUploadDialogComponent>) {}
}
