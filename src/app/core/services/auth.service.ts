import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { User, LoginRequest, RegisterRequest, AuthResponse } from '../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private readonly API_URL = `${environment.apiUrl}/auth`;
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'auth_user';
  private readonly EXPIRY_KEY = 'auth_token_expiry';

  private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
  public currentUser$ = this.currentUserSubject.asObservable();

  // Signal for reactive UI updates
  public isAuthenticated = signal<boolean>(this.hasToken());

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(credentials: LoginRequest): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/login`, credentials).pipe(
      tap(response => this.handleAuthSuccess(response))
    );
  }

  // TODO: Implement registration on the backend
  register(userData: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/register`, userData).pipe(
      tap(response => this.handleAuthSuccess(response))
    );
  }

  // Initialize the service on first-time setup (creates initial admin)
  initialize(initPayload: { hotel_name: string; admin_email: string; admin_name: string; admin_password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/initialize`, initPayload).pipe(
      tap(response => this.handleAuthSuccess(response))
    );
  }

  // TODO: Implement email verification on the backend
  forgotPassword(email: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.API_URL}/forgot-password`, { email });
  }

  // TODO: Implement password reset on the backend
  resetPassword(token: string, newPassword: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.API_URL}/reset-password`, { token, new_password: newPassword });
  }

  logout(navigate = true): void {
    const refresh = localStorage.getItem('refresh_token') || '';
    this.http.post<{ message?: string }>(`${this.API_URL}/logout`, { refresh_token: refresh }).subscribe(
      () => {
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.USER_KEY);
        localStorage.removeItem(this.EXPIRY_KEY);
        localStorage.removeItem('refresh_token');
        this.currentUserSubject.next(null);
        this.isAuthenticated.set(false);

        if (navigate) {
          this.router.navigate(['/login']);
        }
      }, () => {
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.USER_KEY);
        localStorage.removeItem(this.EXPIRY_KEY);
        localStorage.removeItem('refresh_token');
        this.currentUserSubject.next(null);
        this.isAuthenticated.set(false);
        if (navigate) this.router.navigate(['/login']);
      }
    );
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // TODO: Make sure the front-end receives the user from the backend
  private handleAuthSuccess(response: any): void {
    const access = response.access_token || response.token || '';
    const refresh = response.refresh_token || '';
    const expires = response.expires_at || response.expiry || undefined;

    if (access) localStorage.setItem(this.TOKEN_KEY, access);
    if (refresh) localStorage.setItem('refresh_token', refresh);
    if (expires) localStorage.setItem(this.EXPIRY_KEY, expires.toString());

    this.isAuthenticated.set(true);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  private getUserFromStorage(): User | null {
    const userJson = localStorage.getItem(this.USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  }

  isLoggedIn(): boolean {
    if (!this.isAuthenticated()) {
      return false;
    }

    const expiryTime = localStorage.getItem(this.EXPIRY_KEY);
    if (expiryTime == null || Date.parse(expiryTime) < Date.now()) {
      this.logout(false);
      return false;
    }

    return true;
  }
}
