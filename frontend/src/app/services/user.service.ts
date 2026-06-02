import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// This shape matches the User entity on the backend.
export interface User {
  id?: number;
  name: string;
  age: number;
}

/**
 * The User service.
 *
 * This is THE BRIDGE between Angular and the Spring Boot API.
 * Components don't make HTTP calls directly — they go through this service.
 * That way, the URL only lives in one place and components stay clean.
 */
@Injectable({ providedIn: 'root' })
export class UserService {
  // Base URL of our backend API. Spring Boot runs on port 8080.
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  /** GET /api/users — fetch all users */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  /** POST /api/users — save a new user */
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }
}
