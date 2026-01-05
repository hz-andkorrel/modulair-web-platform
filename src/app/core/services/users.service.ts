import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface MeResponse {
  id: string;
  email: string;
  display_name?: string;
  first_time_setup?: boolean;
  language?: string;
  timezone?: string;
  organization?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user' | 'guest';
}

export interface CreateUserRequest {
  email: string;
  name: string;
  role: 'admin' | 'user' | 'guest';
  password: string;
}

export interface UsersListResponse {
  users: User[];
  count: number;
}

@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly API = `${environment.apiUrl}/api`;

  constructor(private http: HttpClient) {}

  getMe(): Observable<MeResponse> {
    return this.http.get<MeResponse>(`${this.API}/me`);
  }

  updateMe(payload: Partial<MeResponse>) {
    return this.http.patch<MeResponse>(`${this.API}/me`, payload);
  }

  // Admin endpoints - lijst van alle gebruikers
  getAllUsers(): Observable<UsersListResponse> {
    return this.http.get<UsersListResponse>(`${this.API}/admin/users`);
  }

  // Admin endpoints - maak nieuwe gebruiker aan
  createUser(userData: CreateUserRequest): Observable<any> {
    return this.http.post<any>(`${this.API}/admin/users`, userData);
  }

  // Admin endpoints - haal specifieke gebruiker op
  getUser(id: string): Observable<any> {
    return this.http.get<any>(`${this.API}/admin/users/${id}`);
  }

  // Admin endpoints - update gebruiker
  updateUser(id: string, userData: { name: string; email: string }): Observable<any> {
    return this.http.put<any>(`${this.API}/admin/users/${id}`, userData);
  }

  // Admin endpoints - update rol van gebruiker
  updateUserRole(id: string, role: string): Observable<any> {
    return this.http.put<any>(`${this.API}/admin/users/${id}/role`, { role });
  }

  // Admin endpoints - verwijder gebruiker
  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.API}/admin/users/${id}`);
  }
}
