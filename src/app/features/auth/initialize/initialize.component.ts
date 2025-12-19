import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-initialize',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './initialize.html',
  styleUrl: './initialize.scss'
})
export class InitializeComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  initializeForm: FormGroup;
  loading = signal(false);
  error = signal('');
  hidePassword = signal(true);
  hideConfirm = signal(true);

  constructor() {
    this.initializeForm = this.fb.group({
      hotel_name: ['', [Validators.required, Validators.minLength(2)]],
      admin_name: ['', [Validators.required, Validators.minLength(2)]],
      admin_email: ['', [Validators.required, Validators.email]],
      admin_password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', [Validators.required]]
    }, { validators: this.passwordMatch });
  }

  passwordMatch(g: FormGroup) {
    const p = g.get('admin_password')?.value;
    const c = g.get('confirm_password')?.value;
    return p === c ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.initializeForm.valid) {
      this.loading.set(true);
      this.error.set('');

      const payload = {
        hotel_name: this.initializeForm.value.hotel_name,
        admin_email: this.initializeForm.value.admin_email,
        admin_name: this.initializeForm.value.admin_name,
        admin_password: this.initializeForm.value.admin_password
      };

      this.authService.initialize(payload).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.loading.set(false);
          this.error.set(err.error?.message || 'Initialization failed.');
        },
        complete: () => {
          this.loading.set(false);
        }
      });
    }
  }
}
