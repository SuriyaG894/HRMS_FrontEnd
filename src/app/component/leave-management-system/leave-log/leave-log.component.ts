import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { LeaveService } from '../../../services/leave-management-services/leave.service';
import { ILeaveHistory } from '../../interface/ILeaveHistory';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-leave-log',
  imports: [CommonModule],
  templateUrl: './leave-log.component.html',
  styleUrl: './leave-log.component.css'
})
export class LeaveLogComponent {

  pagedData: any[] = [];
  historyList:ILeaveHistory[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 1;

  constructor(private leaveService:LeaveService){
  }

  ngOnInit() {
  this.getMockLeaves(); // Only call this
}

  cancelLeave(leaveId:number){
    console.log(leaveId);
    this.leaveService.cancelLeaveRequestByEmployee(leaveId).subscribe({
      next:(response)=>{
        Swal.fire({
  title: "Leave Request Status",
  text: "Leave Request Cancelled Successfully",
  icon: "success"
})
this.getMockLeaves();
      },
      error:(error)=>{}
    });
  }

  getMockLeaves() {
  this.leaveService.getLeaveLogForEmployee().subscribe({
    next: (response: ILeaveHistory[]) => {
      this.historyList = response;
      this.totalPages = Math.ceil(this.historyList.length / this.pageSize);
      this.updatePagedData();
    },
    error: (error) => {
      console.log(error);
    }
  });
}

  updatePagedData() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedData = this.historyList.slice(start, end);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagedData();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedData();
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePagedData();
  }

  totalPagesArray(): number[] {
    return Array(this.totalPages).fill(0).map((_, i) => i + 1);
  }
}
