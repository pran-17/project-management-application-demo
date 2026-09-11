import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AdminSidebar } from '../../shared/admin-sidebar/admin-sidebar';

import {
  TeacherService,
  Teacher
} from '../../services/teacher.service';

@Component({
  selector: 'app-add-teacher',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    AdminSidebar
  ],
  templateUrl: './add-teacher.html',
  styleUrl: './add-teacher.css'
})
export class AddTeacher {

  newTeacher = {
    name: '',
    employeeId: '',
    email: '',
    phone: '',
    department: '',
    password: '',
    designation: '',
    specialization: '',
    status: 'Active',
    students: '',
    projects: ''
  };


  constructor(
    private teacherService: TeacherService,
    private router: Router
  ) {}


  saveTeacher(): void {

    if (
      !this.newTeacher.name.trim() ||
      !this.newTeacher.employeeId.trim() ||
      !this.newTeacher.email.trim() ||
      !this.newTeacher.department
    ) {

      alert('Please fill all required fields');
      return;

    }


    const teacher: Teacher = {

      id: Date.now(),

      name: this.newTeacher.name.trim(),

      employeeId: this.newTeacher.employeeId.trim(),

      email: this.newTeacher.email.trim(),

      phone: this.newTeacher.phone.trim(),

      department: this.newTeacher.department,

      designation: this.newTeacher.designation,
      password: this.newTeacher.password.trim(),

      specialization: this.newTeacher.specialization,

      status: this.newTeacher.status || 'Active',

      students: Number(this.newTeacher.students) || 0,

      projects: Number(this.newTeacher.projects) || 0

    };


    this.teacherService.addTeacher(teacher);

    console.log('Teacher added successfully:', teacher);
    console.log(
      'All teachers:',
      this.teacherService.getTeachers()
    );


    // IMPORTANT: use the correct existing route
    this.router.navigate(['/admin/teacher']);

  }


  cancel(): void {

    this.router.navigate(['/admin/teacher']);

  }

}