import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

export interface DemoUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'teacher' | 'student';
  referenceId: string;
  department?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private demoUsers: Array<DemoUser & { password: string }> = [

    {
      id: 'admin-001',
      name: 'Administrator',
      email: 'admin@gmail.com',
      password: 'admin123',
      role: 'admin',
      referenceId: 'admin-001',
      department: 'Administration'
    },

    {
      id: 'teacher-001',
      name: 'Dr. Kumar',
      email: 'teacher@gmail.com',
      password: 'teacher123',
      role: 'teacher',
      referenceId: 'teacher-001',
      department: 'Computer Science'
    },

    {
      id: 'student-001',
      name: 'Praneeth',
      email: 'student@gmail.com',
      password: 'student123',
      role: 'student',
      referenceId: 'student-001',
      department: 'Computer Science'
    }

  ];

  login(
    email: string,
    password: string,
    role?: string
  ): Observable<any> {

    const user = this.demoUsers.find(
      item =>
        item.email.toLowerCase() === email.toLowerCase().trim() &&
        item.password === password &&
        (!role || item.role === role.toLowerCase())
    );

    if (!user) {
      return throwError(() => ({
        error: {
          message: 'Invalid email, password, or role'
        }
      }));
    }

    const loggedInUser: DemoUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      referenceId: user.referenceId,
      department: user.department
    };

    // Demo token
    sessionStorage.setItem('token', 'demo-token');

    // Logged-in user
    sessionStorage.setItem(
      'user',
      JSON.stringify(loggedInUser)
    );

    return of({
      success: true,
      message: 'Login successful',
      token: 'demo-token',
      user: loggedInUser
    });
  }

  getUser(): DemoUser | null {

    const userData = sessionStorage.getItem('user');

    if (!userData) {
      return null;
    }

    try {
      return JSON.parse(userData);
    } catch {
      return null;
    }
  }

  getRole(): string | null {
    return this.getUser()?.role || null;
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token');
  }

  logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  }
}