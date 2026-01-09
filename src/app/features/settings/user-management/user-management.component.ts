import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { UsersService, User, CreateUserRequest } from '../../../core/services/users.service';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export class UserManagementComponent implements OnInit {
  userForm: FormGroup;
  users = signal<User[]>([]);
  loading = signal(false);
  submitting = signal(false);
  displayedColumns: string[] = ['name', 'email', 'role', 'actions'];

  roles = [
    { value: 'admin', label: 'Administrator' },
    { value: 'user', label: 'User' },
    { value: 'guest', label: 'Guest' }
  ];

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['user', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading.set(true);
    this.usersService.getAllUsers().subscribe({
      next: (response: any) => {
        this.users.set(response.users);
        this.loading.set(false);
      },
      error: (err: any) => {
        this.snackBar.open(err.error?.error || 'Failed to load users', 'Close', { duration: 3000 });
        this.loading.set(false);
      }
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.submitting.set(true);
      const userData: CreateUserRequest = this.userForm.value;

      this.usersService.createUser(userData).subscribe({
        next: (response: any) => {
          this.snackBar.open('User created successfully! They can set their password via "Forgot Password".', 'Close', { duration: 5000 });
          this.userForm.reset({ role: 'user' });
          this.loadUsers();
          this.submitting.set(false);
        },
        error: (err: any) => {
          this.snackBar.open(err.error?.error || 'Failed to create user', 'Close', { duration: 3000 });
          this.submitting.set(false);
        }
      });
    }
  }

  deleteUser(user: User): void {
    if (confirm(`Are you sure you want to delete user "${user.name}"?`)) {
      this.usersService.deleteUser(user.id).subscribe({
        next: () => {
          this.snackBar.open('User deleted successfully', 'Close', { duration: 3000 });
          this.loadUsers();
        },
        error: (err: any) => {
          this.snackBar.open(err.error?.error || 'Failed to delete user', 'Close', { duration: 3000 });
        }
      });
    }
  }

  updateRole(user: User, newRole: string): void {
    this.usersService.updateUserRole(user.id, newRole).subscribe({
      next: () => {
        this.snackBar.open('User role updated successfully', 'Close', { duration: 3000 });
        this.loadUsers();
      },
      error: (err: any) => {
        this.snackBar.open(err.error?.error || 'Failed to update role', 'Close', { duration: 3000 });
      }
    });
  }
}
