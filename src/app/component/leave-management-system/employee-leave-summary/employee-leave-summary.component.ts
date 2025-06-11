import { Component, ElementRef, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { IPendingLeaveRequest } from '../../interface/IPendingLeaveRequest';
import { IApprovalRequest } from '../../interface/IApprovalRequest';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LeaveService } from '../../../services/leave-management-services/leave.service';
import { CommonModule } from '@angular/common';
import { IEmployeeLeaveSummary } from '../../interface/IEmployeeLeaveSummary';
import { MonthsToYearsPipe } from '../../pipes/months-to-years.pipe';

@Component({
  selector: 'app-employee-leave-summary',
  imports: [CommonModule,ReactiveFormsModule,FormsModule,MonthsToYearsPipe],
  templateUrl: './employee-leave-summary.component.html',
  styleUrl: './employee-leave-summary.component.css'
})
export class EmployeeLeaveSummaryComponent {
  filterForm!: FormGroup;
  searchText: string = '';
  originalData: IEmployeeLeaveSummary[] = [];
  filteredData: IEmployeeLeaveSummary[] = [];
  pagedData: IEmployeeLeaveSummary[] = [];

  currentPage: number = 1;
  pageSize: number = 3;
  totalPages: number = 1;

  constructor(private fb: FormBuilder, private leaveService: LeaveService) {}

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      experienceCategory: [''] // Can be '', '0-2', or '2+'
    });

    this.getMockLeaves();
  }

  getMockLeaves(): void {
    this.leaveService.getEmployeeLeaveSummary().subscribe({
      next: (response) => {
        this.originalData = [...response];
        this.filteredData = [...response];
        this.totalPages = Math.ceil(this.filteredData.length / this.pageSize);
        this.updatePagedData();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  updatePagedData(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedData = this.filteredData.slice(start, end);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagedData();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedData();
    }
  }

  showSelectedPage(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.currentPage = Number(selectElement.value);
    this.updatePagedData();
  }

  getRange(n: number): number[] {
    return Array.from({ length: n }, (_, i) => i + 1);
  }

  searchEmployees(): void {
    const lowerSearch = this.searchText.trim().toLowerCase();

    this.filteredData = this.originalData.filter(emp =>
      emp.employeeName.toLowerCase().includes(lowerSearch)
    );

    this.applyFilter(); // To re-apply filter after search
  }

  applyFilter(): void {
    const experienceCategory = this.filterForm.value.experienceCategory;
    let tempData = [...this.originalData];

    if (this.searchText.trim()) {
      const lowerSearch = this.searchText.trim().toLowerCase();
      tempData = tempData.filter(emp =>
        emp.employeeName.toLowerCase().includes(lowerSearch)
      );
    }

    if (experienceCategory === '0-2') {
      tempData = tempData.filter(emp => emp.experience/12 >= 0 && emp.experience/12 <= 2);
    } else if (experienceCategory === '2+') {
      tempData = tempData.filter(emp => emp.experience/12 > 2);
    }

    this.filteredData = tempData;
    this.totalPages = Math.ceil(this.filteredData.length / this.pageSize);
    this.currentPage = 1;
    this.updatePagedData();
  }

  resetFilter(): void {
    this.searchText = '';
    this.filterForm.reset();
    this.filteredData = [...this.originalData];
    this.totalPages = Math.ceil(this.filteredData.length / this.pageSize);
    this.currentPage = 1;
    this.updatePagedData();
  }

  onSearch(): void {
  this.searchEmployees(); // Already implemented logic
}

openFilterModal(): void {
  const modal = document.getElementById('filterModal');
  if (modal) {
    modal.style.display = 'block';
    modal.classList.add('show');
  }
}

closeFilterModal(): void {
  const modal = document.getElementById('filterModal');
  if (modal) {
    modal.style.display = 'none';
    modal.classList.remove('show');
  }
}


}
