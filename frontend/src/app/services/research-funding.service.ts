import { Injectable } from '@angular/core';

export interface ResearchFunding {
  id: number;
  fundingId: string;

  projectTitle: string;
  fundingAgency: string;
  principalInvestigator: string;
  department: string;

  startDate: string;
  endDate: string;

  totalAmount: number;
  utilizedAmount: number;
  remainingAmount: number;

  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class ResearchFundingService {

  private fundings: ResearchFunding[] = [

    {
      id: 1,
      fundingId: 'RF2026001',
      projectTitle: 'AI Based Smart Attendance System',
      fundingAgency: 'DST India',
      principalInvestigator: 'Dr. Kumar',
      department: 'Computer Science',
      startDate: '01 Jan 2026',
      endDate: '31 Dec 2027',

      totalAmount: 500000,
      utilizedAmount: 275000,
      remainingAmount: 225000,

      status: 'Active'
    },

    {
      id: 2,
      fundingId: 'RF2026002',
      projectTitle: 'IoT Based Smart Campus',
      fundingAgency: 'AICTE',
      principalInvestigator: 'Dr. Priya',
      department: 'Information Technology',
      startDate: '15 Feb 2026',
      endDate: '14 Feb 2028',

      totalAmount: 750000,
      utilizedAmount: 320000,
      remainingAmount: 430000,

      status: 'Active'
    }

  ];


  getFunding(): ResearchFunding[] {
    return this.fundings;
  }


  addFunding(funding: ResearchFunding): void {
    this.fundings.push(funding);
  }


  deleteFunding(id: number): void {

    this.fundings = this.fundings.filter(
      funding => funding.id !== id
    );

  }

}