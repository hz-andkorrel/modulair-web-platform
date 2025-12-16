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
}
