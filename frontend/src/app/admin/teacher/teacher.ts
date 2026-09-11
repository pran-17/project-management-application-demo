import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Header } from '../../shared/header/header';
import { AdminSidebar } from '../../shared/admin-sidebar/admin-sidebar';

import {
  TeacherService,
  Teacher
} from '../../services/teacher.service';

@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    AdminSidebar,
    Header
  ],
  templateUrl: './teacher.html',
  styleUrl: './teacher.css'
})
export class Teachers {

  searchText = '';

  selectedDepartment = 'All';

  teachers: Teacher[] = [];


  constructor(
    private teacherService: TeacherService
  ) {

    this.teachers =
      this.teacherService.getTeachers();

  }


  get filteredTeachers(): Teacher[] {

    const search =
      this.searchText.toLowerCase().trim();

    return this.teachers.filter(teacher => {

      const matchesSearch =
        teacher.name.toLowerCase().includes(search) ||
        teacher.employeeId.toLowerCase().includes(search) ||
        teacher.department.toLowerCase().includes(search) ||
        teacher.email.toLowerCase().includes(search);

      const matchesDepartment =
        this.selectedDepartment === 'All' ||
        teacher.department === this.selectedDepartment;

      return matchesSearch && matchesDepartment;

    });

  }


  get activeTeachersCount(): number {

    return this.teachers.filter(
      teacher => teacher.status === 'Active'
    ).length;

  }


 get assignedStudentsCount(): number {

  return this.teachers.reduce(
    (total, teacher) => total + Number(teacher.students || 0),
    0
  );

}


get activeProjectsCount(): number {

  return this.teachers.reduce(
    (total, teacher) => total + Number(teacher.projects || 0),
    0
  );

}


  viewTeacher(teacher: Teacher): void {

    alert(
      'Teacher Details\n\n' +
      'Name: ' + teacher.name + '\n' +
      'Employee ID: ' + teacher.employeeId + '\n' +
      'Department: ' + teacher.department + '\n' +
      'Specialization: ' + teacher.specialization + '\n' +
      'Email: ' + teacher.email
    );

  }


  // ADD THIS METHOD
  toggleStatus(teacher: Teacher): void {

    if (teacher.status === 'Active') {

      teacher.status = 'Inactive';

    } else {

      teacher.status = 'Active';

    }

  }


  deleteTeacher(id: number): void {

    const confirmed =
      confirm('Are you sure you want to delete this teacher?');

    if (!confirmed) {
      return;
    }

    this.teacherService.deleteTeacher(id);

    this.teachers =
      this.teacherService.getTeachers();

  }

}