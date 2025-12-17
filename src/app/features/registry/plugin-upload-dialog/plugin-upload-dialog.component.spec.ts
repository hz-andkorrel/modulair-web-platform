import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { PluginUploadDialogComponent } from './plugin-upload-dialog.component';

describe('PluginUploadDialogComponent', () => {
  let component: PluginUploadDialogComponent;
  let fixture: ComponentFixture<PluginUploadDialogComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<PluginUploadDialogComponent>>;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close', 'dismiss']);

    await TestBed.configureTestingModule({
      imports: [PluginUploadDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PluginUploadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
