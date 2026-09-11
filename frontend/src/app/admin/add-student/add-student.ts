import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminSidebar } from '../../shared/admin-sidebar/admin-sidebar';

import {
  StudentService,
  Student
} from '../../services/student.service';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [
    FormsModule,
    AdminSidebar
  ],
  templateUrl: './add-student.html',
  styleUrl: './add-student.css'
})
export class AddStudent {

  newStudent = {
    name: '',
    registerNumber: '',
    email: '',
    password: '',
    department: '',
    phone: '',
    year: '',
    status: '',
    guide: '',
    project: ''
  };

  constructor(
    private studentService: StudentService,
    private router: Router
  ) {}

  saveStudent(): void {

    if (
      !this.newStudent.name.trim() ||
      !this.newStudent.registerNumber.trim() ||
      !this.newStudent.email.trim() ||
      !this.newStudent.department
    ) {
      alert('Please fill all required fields');
      return;
    }

    const student: Student = {
      id: Date.now(),

      name: this.newStudent.name.trim(),

      registerNumber: this.newStudent.registerNumber.trim(),

      email: this.newStudent.email.trim(),

      department: this.newStudent.department,
      password: this.newStudent.password.trim(),

      phone: this.newStudent.phone,

      year: this.newStudent.year,

      status: this.newStudent.status,

      guide: this.newStudent.guide || 'Not Assigned',

      project: this.newStudent.project || 'Not Assigned'
    };

    // Add student to shared service
    this.studentService.addStudent(student);

    console.log(
      'Student added successfully:',
      student
    );

    console.log(
      'All students:',
      this.studentService.getStudents()
    );

    // Go to Students page after saving
    this.router.navigate(['/admin/students']);
  }


  // CANCEL BUTTON
  cancel(): void {

    // Go back without saving
    this.router.navigate(['/admin/students']);

  }

}