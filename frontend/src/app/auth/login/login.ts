import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

type UserRole = 'student' | 'teacher' | 'admin';

interface DemoUser {
  email: string;
  password: string;
  role: UserRole;
  name: string;
  department: string;
  referenceId: string;
}

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

  // Frontend-only demo users
  private demoUsers: DemoUser[] = [

    {
      email: 'admin@gmail.com',
      password: 'admin123',
      role: 'admin',
      name: 'Administrator',
      department: 'Administration',
      referenceId: 'admin-001'
    },

    {
      email: 'teacher@gmail.com',
      password: 'teacher123',
      role: 'teacher',
      name: 'Dr. Kumar',
      department: 'Computer Science',
      referenceId: 'teacher-001'
    },

    {
      email: 'student@gmail.com',
      password: 'student123',
      role: 'student',
      name: 'Praneeth',
      department: 'Computer Science',
      referenceId: 'student-001'
    }

  ];

  constructor(
    private router: Router
  ) {}

  selectRole(role: UserRole): void {
    this.selectedRole = role;
    this.errorMessage = '';
  }

  login(): void {

    this.errorMessage = '';

    // Validate email
    if (!this.email.trim()) {
      this.errorMessage = 'Please enter your email address.';
      return;
    }

    // Validate password
    if (!this.password.trim()) {
      this.errorMessage = 'Please enter your password.';
      return;
    }

    // Find matching user
    const user = this.demoUsers.find(
      item =>
        item.email === this.email.trim().toLowerCase() &&
        item.password === this.password &&
        item.role === this.selectedRole
    );

    // Invalid login
    if (!user) {
      this.errorMessage =
        'Invalid email, password or selected role.';
      return;
    }

    // Store demo authentication
    sessionStorage.setItem('token', 'demo-token');

    sessionStorage.setItem(
      'user',
      JSON.stringify({
        id: user.referenceId,
        name: user.name,
        email: user.email,
        role: user.role,
        referenceId: user.referenceId,
        department: user.department
      })
    );

    // Navigate according to role
    this.router.navigate([
      `/${user.role}/dashboard`
    ]);
  }
}