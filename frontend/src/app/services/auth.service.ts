import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/signin`, credentials);
  }

  signup(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, data);
  }

  resetPasswordDemand(email: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/reset-password`, email);
  }

  resetPasswordConfirmation(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/reset-password-confirmation`, data);
  }
}
