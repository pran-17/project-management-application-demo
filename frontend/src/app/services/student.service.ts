import { Injectable } from '@angular/core';

export interface Student {
  id: number;
  name: string;
  registerNumber: string;
  email: string;
  password: string;
  phone: string;
  department: string;
  year: string;
  status: string;
  guide: string;
  project?: string;

  
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private students: Student[] = [

    {
      id: 1,
      name: 'Praneeth',
      registerNumber: 'CSE2026001',
      email: 'praneeth@student.com',
      phone: '',
      password: '',
      department: 'Computer Science',
      year: 'Final Year',
      guide: 'Dr. Kumar',
      status: 'A',
      project: 'PRJ001',
      
    },

    {
      id: 2,
      name: 'Rahul',
      registerNumber: 'CSE2026002',
      email: 'rahul@student.com',
      phone: '',
      password: '',
      department: 'Computer Science',
      year: 'Final Year',
      guide: 'Dr. priya',
      status: 'A',
      project: 'PRD001'
    }

  ];


  getStudents(): Student[] {

    return this.students;

  }


  addStudent(student: Student): void {

    this.students.push(student);

    console.log('Student added:', student);
    console.log('All students:', this.students);

  }


  deleteStudent(id: number): void {

    this.students = this.students.filter(
      student => student.id !== id
    );

  }

}