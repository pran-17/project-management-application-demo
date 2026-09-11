import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

type UserRole = 'student' | 'teacher' | 'admin';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email = '';
  password = '';

  selectedRole: UserRole = 'student';

  rememberMe = false;

  errorMessage = '';

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  selectRole(role: UserRole): void {
    this.selectedRole = role;
    this.errorMessage = '';
  }

  login(): void {

    this.errorMessage = '';

    if (!this.email.trim()) {
      this.errorMessage = 'Please enter your email address.';
      return;
    }

    if (!this.password.trim()) {
      this.errorMessage = 'Please enter your password.';
      return;
    }

    this.http.post<{ token: string; user: { role: UserRole } }>(
      'http://localhost:5000/api/auth/login',
      {
        email: this.email.trim().toLowerCase(),
        password: this.password
      }
    ).subscribe({
      next: response => {
        if (response.user.role !== this.selectedRole) {
          this.errorMessage = 'Invalid email, password or selected role.';
          return;
        }

        localStorage.setItem('token', response.token);
        this.router.navigate([`/${response.user.role}/dashboard`]);
      },
      error: error => {
        this.errorMessage = error.error?.message || 'Unable to connect to the backend.';
      }
    });
  }
}