import { Injectable } from '@angular/core';

export interface Teacher {
  id: number;
  name: string;
  employeeId: string;
  email: string;
  phone: string;
  department: string;
  password: string;
  designation: string;
  specialization: string;
  students: number;
  projects: number;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private teachers: Teacher[] = [

    {
      id: 1,
      name: 'Dr. Kumar',
      employeeId: 'EMP001',
      email: 'kumar@college.edu',
      password: 'securepassword',
      phone: '9876543210',
      department: 'Computer Science',
      designation: 'Professor',
      specialization: 'Artificial Intelligence',
      status: 'Active',
      students: 5,
      projects: 3
    },

    {
      id: 2,
      name: 'Dr. Priya',
      employeeId: 'EMP002',
      email: 'priya@college.edu',
      password: 'securepassword',
      phone: '9876543211',
      department: 'Information Technology',
      designation: 'Associate Professor',
      specialization: 'Machine Learning',
      status: 'Active',
      students: 3,
      projects: 2
    }

  ];


  getTeachers(): Teacher[] {
    return this.teachers;
  }


  addTeacher(teacher: Teacher): void {

    this.teachers.push(teacher);

    console.log('Teacher added:', teacher);
    console.log('All teachers:', this.teachers);

  }


  deleteTeacher(id: number): void {

    this.teachers = this.teachers.filter(
      teacher => teacher.id !== id
    );

  }

}