import { Component } from '@angular/core';
import { ILeaveBalanceAll } from '../../interface/ILeaveBalanceAll';
import { LeaveService } from '../../../services/leave-management-services/leave.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-leave-allocation-panel',
  imports: [FormsModule,CommonModule],
  templateUrl: './leave-allocation-panel.component.html',
  styleUrl: './leave-allocation-panel.component.css'
})
export class LeaveAllocationPanelComponent {
  leaveBalances: ILeaveBalanceAll[] = [];
pagedData: ILeaveBalanceAll[] = [];

  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;

  constructor(private leaveBalanceService: LeaveService) {}

  ngOnInit(): void {
    this.fetchLeaveBalances();
  }

  editingRowIndex: number | null = null;
editedRow: ILeaveBalanceAll = {} as ILeaveBalanceAll;

editRow(index: number): void {
  this.editingRowIndex = index;
  this.editedRow = { ...this.pagedData[index] }; // clone row data
}

cancelEdit(): void {
  this.editingRowIndex = null;
  this.editedRow = {} as ILeaveBalanceAll;
}

saveRow(): void {
  // Call service to update if needed
  let updatedRow:ILeaveBalanceAll = this.editedRow;
  this.leaveBalanceService.updateLeaveBalance(this.editedRow.employeeId,updatedRow).subscribe({
    next:(response)=>{console.log(response);
      Swal.fire({
        title: "Leave Status",
        text: response.toString(),
        icon: "success"
      })
    },
    error:(error)=>{console.log(error);
      Swal.fire({
        title: "Leave Status",
        text: error.message,
        icon: "error"
      })
    }
  })
  const globalIndex = (this.currentPage - 1) * this.pageSize + (this.editingRowIndex ?? 0);
  this.leaveBalances[globalIndex] = { ...this.editedRow };
  this.updatePagedData();
  this.editingRowIndex = null;
  console.log(this.editedRow);
}

  fetchLeaveBalances(): void {
    this.leaveBalanceService.getAllLeaveBalance().subscribe({
      next: (response: ILeaveBalanceAll[]) => {
        this.leaveBalances = response;
        this.totalPages = Math.ceil(this.leaveBalances.length / this.pageSize);
        this.currentPage = 1;
        this.updatePagedData();
      },
      error: (error) => {
        console.error('Error fetching leave balances:', error);
      }
    });
  }

  updatePagedData(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedData = this.leaveBalances.slice(start, end);
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

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagedData();
    }
  }

  totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
