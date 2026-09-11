import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { AdminSidebar } from '../../shared/admin-sidebar/admin-sidebar';

interface TeamMember {
  id: number;
  name: string;
  registerNumber: string;
  email: string;
  role: string;
}

interface ResearchProject {
  id: number;
  title: string;
  researchId: string;
  principalInvestigator: string;
  department: string;
  fundingAgency: string;
  budget: number;
  duration: string;
  status: string;
  progress: number;

  team: TeamMember[];
}

@Component({
  selector: 'app-research-projects',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AdminSidebar
  ],
  templateUrl: './research.html',
  styleUrl: './research.css'
})
export class ResearchProjects {

  searchText = '';

  selectedDepartment = 'All';

  // Controls the details popup
  showDetails = false;

  // Selected project for View Details
  selectedProject: ResearchProject | null = null;

  projects: ResearchProject[] = [

    {
      id: 1,
      title: 'AI-Based Smart Healthcare System',
      researchId: 'RES2026001',
      principalInvestigator: 'Dr. Kumar',
      department: 'Computer Science',
      fundingAgency: 'DST',
      budget: 500000,
      duration: '2025 - 2027',
      status: 'Ongoing',
      progress: 65,

      team: [
        {
          id: 1,
          name: 'Praneeth',
          registerNumber: 'CSE2026001',
          email: 'praneeth@student.com',
          role: 'Team Leader'
        },
        {
          id: 2,
          name: 'Rahul',
          registerNumber: 'CSE2026002',
          email: 'rahul@student.com',
          role: 'Research Member'
        },
        {
          id: 3,
          name: 'Arun',
          registerNumber: 'CSE2026003',
          email: 'arun@student.com',
          role: 'Research Member'
        }
      ]
    },

    {
      id: 2,
      title: 'Machine Learning for Crop Prediction',
      researchId: 'RES2026002',
      principalInvestigator: 'Dr. Priya',
      department: 'Information Technology',
      fundingAgency: 'ICAR',
      budget: 750000,
      duration: '2026 - 2028',
      status: 'Ongoing',
      progress: 40,

      team: [
        {
          id: 4,
          name: 'Karthik',
          registerNumber: 'IT2026001',
          email: 'karthik@student.com',
          role: 'Team Leader'
        },
        {
          id: 5,
          name: 'Vijay',
          registerNumber: 'IT2026002',
          email: 'vijay@student.com',
          role: 'Research Member'
        }
      ]
    },

    {
      id: 3,
      title: 'IoT Based Smart Campus',
      researchId: 'RES2026003',
      principalInvestigator: 'Dr. Arun',
      department: 'Electronics',
      fundingAgency: 'AICTE',
      budget: 350000,
      duration: '2024 - 2026',
      status: 'Completed',
      progress: 100,

      team: [
        {
          id: 6,
          name: 'Sanjay',
          registerNumber: 'ECE2026001',
          email: 'sanjay@student.com',
          role: 'Team Leader'
        },
        {
          id: 7,
          name: 'Ajay',
          registerNumber: 'ECE2026002',
          email: 'ajay@student.com',
          role: 'Research Member'
        }
      ]
    },

    {
      id: 4,
      title: 'Cyber Security Threat Detection',
      researchId: 'RES2026004',
      principalInvestigator: 'Dr. Meena',
      department: 'Computer Science',
      fundingAgency: 'SERB',
      budget: 600000,
      duration: '2026 - 2029',
      status: 'Ongoing',
      progress: 25,

      team: [
        {
          id: 8,
          name: 'Deepak',
          registerNumber: 'CSE2026004',
          email: 'deepak@student.com',
          role: 'Team Leader'
        },
        {
          id: 9,
          name: 'Naveen',
          registerNumber: 'CSE2026005',
          email: 'naveen@student.com',
          role: 'Research Member'
        }
      ]
    },

    {
      id: 5,
      title: 'Renewable Energy Management System',
      researchId: 'RES2026005',
      principalInvestigator: 'Dr. Ravi',
      department: 'Electronics',
      fundingAgency: 'MNRE',
      budget: 900000,
      duration: '2025 - 2028',
      status: 'Pending',
      progress: 10,

      team: [
        {
          id: 10,
          name: 'Ramesh',
          registerNumber: 'ECE2026003',
          email: 'ramesh@student.com',
          role: 'Team Leader'
        }
      ]
    }

  ];

  get filteredProjects(): ResearchProject[] {

    const search = this.searchText.toLowerCase();

    return this.projects.filter(project => {

      const matchesSearch =
        project.title.toLowerCase().includes(search) ||
        project.researchId.toLowerCase().includes(search) ||
        project.principalInvestigator.toLowerCase().includes(search);

      const matchesDepartment =
        this.selectedDepartment === 'All' ||
        project.department === this.selectedDepartment;

      return matchesSearch && matchesDepartment;

    });

  }

  get ongoingProjectsCount(): number {

    return this.projects.filter(
      project => project.status === 'Ongoing'
    ).length;

  }

  get completedProjectsCount(): number {

    return this.projects.filter(
      project => project.status === 'Completed'
    ).length;

  }

  get totalFunding(): number {

    return this.projects.reduce(
      (total, project) => total + project.budget,
      0
    );

  }


  // VIEW DETAILS
  viewProject(project: ResearchProject): void {

    this.selectedProject = project;

    this.showDetails = true;

  }


  // CLOSE DETAILS
  closeDetails(): void {

    this.showDetails = false;

    this.selectedProject = null;

  }


  deleteProject(id: number): void {

    this.projects = this.projects.filter(
      project => project.id !== id
    );

    // Close popup if the currently selected project is deleted
    if (this.selectedProject?.id === id) {

      this.closeDetails();

    }

  }

}