import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { AdminSidebar } from '../../shared/admin-sidebar/admin-sidebar';

import {
  ResearchFundingService,
  ResearchFunding
} from '../../services/research-funding.service';

@Component({
  selector: 'app-research-funding',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    AdminSidebar
  ],
  templateUrl: './research-funding.html',
  styleUrl: './research-funding.css'
})
export class ResearchFundingComponent {

  searchText = '';

  fundings: ResearchFunding[] = [];

  constructor(
    private researchFundingService: ResearchFundingService
  ) {
    this.fundings =
      this.researchFundingService.getFunding();
  }


  get filteredFundings(): ResearchFunding[] {

    const search = this.searchText
      .toLowerCase()
      .trim();

    return this.fundings.filter(funding =>
      funding.projectTitle.toLowerCase().includes(search) ||
      funding.principalInvestigator.toLowerCase().includes(search) ||
      funding.department.toLowerCase().includes(search) ||
      funding.fundingAgency.toLowerCase().includes(search) ||
      funding.fundingId.toLowerCase().includes(search)
    );
  }


  get totalFunding(): number {

    return this.fundings.reduce(
      (total: number, funding: ResearchFunding) =>
        total + funding.totalAmount,
      0
    );
  }


  get utilizedFunding(): number {

    return this.fundings.reduce(
      (total: number, funding: ResearchFunding) =>
        total + funding.utilizedAmount,
      0
    );
  }


  get remainingFunding(): number {

    return this.fundings.reduce(
      (total: number, funding: ResearchFunding) =>
        total + funding.remainingAmount,
      0
    );
  }


  get activeFundingCount(): number {

    return this.fundings.filter(
      funding => funding.status === 'Active'
    ).length;
  }


  getUtilizationPercentage(
    funding: ResearchFunding
  ): number {

    if (funding.totalAmount === 0) {
      return 0;
    }

    return Math.round(
      (funding.utilizedAmount / funding.totalAmount) * 100
    );
  }


  deleteFunding(id: number): void {

    this.researchFundingService.deleteFunding(id);

    this.fundings =
      this.researchFundingService.getFunding();
  }

}