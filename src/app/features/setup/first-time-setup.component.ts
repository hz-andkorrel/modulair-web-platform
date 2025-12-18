import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { UsersService, MeResponse } from '../../core/services/users.service';

@Component({
  selector: 'app-first-time-setup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './first-time-setup.component.html',
  styleUrls: ['./first-time-setup.component.scss']
})
export class FirstTimeSetupComponent {
  private fb = inject(FormBuilder);
  private users = inject(UsersService);
  private router = inject(Router);

  loading = false;
  error = '';

  form = this.fb.group({
    display_name: ['', [Validators.required, Validators.minLength(2)]],
    organization: [''],
    language: ['en', [Validators.required]],
    timezone: ['Europe/Amsterdam', [Validators.required]]
  });

  submit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.error = '';

    const v = this.form.value as {
      display_name?: string | null;
      organization?: string | null;
      language?: string | null;
      timezone?: string | null;
    };

    const payload: Partial<MeResponse> = { first_time_setup: false };
    if (v.display_name != null && v.display_name !== '') payload.display_name = v.display_name;
    if (v.organization != null && v.organization !== '') payload.organization = v.organization;
    if (v.language != null && v.language !== '') payload.language = v.language;
    if (v.timezone != null && v.timezone !== '') payload.timezone = v.timezone;

    this.users.updateMe(payload).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err) => {
        this.error = err?.error?.message || 'Failed to update profile';
        this.loading = false;
      },
      complete: () => (this.loading = false)
    });
  }

  goBack() {
    if (!this.loading) {
      this.router.navigate(['/login']);
    }
  }
}
