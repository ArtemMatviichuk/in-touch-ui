import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthRequest } from '../types/auth-request.type';
import { Observable } from 'rxjs';
import { AuthResponse } from '../types/auth-response.type';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = 'https://localhost:7068';

  constructor(private http: HttpClient) {}

  public register(data: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.authUrl}/api/Auth/Register`,
      data
    ); // switchMap and log valid data
  }

  public login(data: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.authUrl}/api/Auth/Authenticate`,
      data
    ); // switchMap and log valid data
  }
}
