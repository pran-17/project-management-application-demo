import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminSidebar } from '../../shared/admin-sidebar/admin-sidebar';

import {
  StudentService,
  Student
} from '../../services/student.service';

import {
  TeacherService,
  Teacher
} from '../../services/teacher.service';


@Component({
  selector: 'app-assign-guide',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AdminSidebar
  ],
  templateUrl: './assign-guide.html',
  styleUrl: './assign-guide.css'
})
export class AssignGuide {

  students: Student[] = [];

  teachers: Teacher[] = [];

  selectedGuides: {
    [key: number]: string
  } = {};


  constructor(
    private studentService: StudentService,
    private teacherService: TeacherService
  ) {

    this.loadData();

  }


  loadData(): void {

    this.students =
      this.studentService.getStudents();

    this.teachers =
      this.teacherService.getTeachers();

  }


  get pendingStudents(): Student[] {

    return this.students.filter(
      student =>
        !student.guide ||
        student.guide === '' ||
        student.guide === 'Not Assigned'
    );

  }


  get assignedStudents(): Student[] {

    return this.students.filter(
      student =>
        student.guide &&
        student.guide !== '' &&
        student.guide !== 'Not Assigned'
    );

  }


  assignGuide(student: Student): void {

    const teacherName =
      this.selectedGuides[student.id];


    if (!teacherName) {

      alert('Please select a teacher');

      return;

    }


    const teacher =
      this.teachers.find(
        teacher =>
          teacher.name === teacherName
      );


    if (!teacher) {

      alert('Teacher not found');

      return;

    }


    student.guide =
      teacher.name;


    student.status =
      'Assigned';


    alert(
      `${teacher.name} assigned as guide for ${student.name}`
    );


    this.selectedGuides[student.id] = '';

  }


  removeGuide(student: Student): void {

    student.guide =
      'Not Assigned';

    student.status =
      'Pending';

  }

}