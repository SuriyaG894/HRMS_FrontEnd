import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IPendingLeaveRequest } from '../../interface/IPendingLeaveRequest';
import { IApprovalRequest } from '../../interface/IApprovalRequest';
import { LeaveService } from '../../../services/leave-management-services/leave.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pending-leave-request-hr',
  imports: [CommonModule,FormsModule],
  templateUrl: './pending-leave-request-hr.component.html',
  styleUrl: './pending-leave-request-hr.component.css'
})
export class PendingLeaveRequestHrComponent {
  pagedData: any[] = [];
      historyList:IPendingLeaveRequest[] = [];
      currentPage: number = 1;
      pageSize: number = 3;
      totalPages: number = 1;
      showSaveBtn:boolean = false;
      editingRowIndex!:number;
      editedRow!:IApprovalRequest;
      showWarning!:boolean;
      filteredList!:IPendingLeaveRequest[];
      filters = {
  employeeName: '',
  employeeId: null,
  duration: '',
  leaveType: '',
  status: '',
  appliedOn: ''
};

leaveTypes = ['EARNED_LEAVE', 'ADVANCE_LEAVE', 'LOP', 'MATERNITY', 'PATERNITY'];

applyFilters() {
  console.log(this.historyList);
  this.filteredList = this.historyList.filter(item => {
    const nameMatch = !this.filters.employeeName || 
      item.appliedBy?.toLowerCase().includes(this.filters.employeeName.trim().toLowerCase());

    const idMatch = !this.filters.employeeId || item.empId === +this.filters.employeeId;

    const durationMatch = !this.filters.duration || item.leaveDurationType === this.filters.duration;

    const typeMatch = !this.filters.leaveType || item.leaveType === this.filters.leaveType;

    const statusMatch = !this.filters.status || item.approvalStatus === this.filters.status;

    const appliedDateMatch = !this.filters.appliedOn || 
      (item.appliedAt && new Date(item.appliedAt).toISOString().split('T')[0] === this.filters.appliedOn);

    return nameMatch && idMatch && durationMatch && typeMatch && statusMatch && appliedDateMatch;
  });

  this.totalPages = Math.ceil(this.filteredList.length / this.pageSize);
  this.currentPage = 1;
this.updatePagedDataFromFilteredList();


}

updatePagedDataFromFilteredList() {
  const start = (this.currentPage - 1) * this.pageSize;
  const end = start + this.pageSize;
  this.pagedData = this.filteredList.slice(start, end);
}


resetFilters() {
  this.filters = {
    employeeName: '',
    employeeId: null,
    duration: '',
    leaveType: '',
    status: '',
    appliedOn: ''
  };
}


  
      constructor(private leaveService:LeaveService){
      }
    
      getRange(n: number): number[] {
      return Array.from({ length: n }, (_, i) => i + 1);
    }
    
    showSelectedPage(event:Event){
      const selectElement = event.target as HTMLSelectElement;
      const selectedPage = Number(selectElement.value);
      this.currentPage = selectedPage;
      this.updatePagedData();
      console.log(this.currentPage);
    }
    
      ngOnInit() {
      this.getMockLeaves(); // Only call this
    }
  
    toggleBtn(){
      this.showSaveBtn = !this.showSaveBtn;
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
      this.leaveService.getPendingLeaveRequestForHr().subscribe({
        next: (response: IPendingLeaveRequest[]) => {
          this.historyList = response;
          this.totalPages = Math.ceil(this.historyList.length / this.pageSize);
          this.updatePagedData();
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
    
      updatePagedData() {
  const dataSource = this.filteredList && this.filteredList.length ? this.filteredList : this.historyList;
  const start = (this.currentPage - 1) * this.pageSize;
  const end = start + this.pageSize;
  this.pagedData = dataSource.slice(start, end);
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
  
      editRow(rowNum:number){
        this.editingRowIndex = rowNum;
        this.editedRow = {...this.pagedData[rowNum]}
      }
  
      approveRequest(index:number){
      this.editedRow = {...this.pagedData[index]};
      let leaveId = {...this.pagedData[index]}.leaveId;
      this.editedRow.approvalStatus = "APPROVED";
      console.log(this.editedRow);
      let approveRequestObj = {'approvalStatus':this.editedRow['approvalStatus'],'remark':this.editedRow.remarks};
      this.leaveService.approveLeaveRequestByHr(approveRequestObj,leaveId).subscribe({
        next:(response)=>{
          console.log(response);
          Swal.fire('Leave Status', response.toString(), 'success');
        },
        error:(error)=>{
          console.log(error);
          Swal.fire('Leave Status', error?.error.message, 'error');
        }
      });
      }
  
      rejectRequest(index:number){
         this.editedRow = {...this.pagedData[index]};
      let leaveId = {...this.pagedData[index]}.leaveId;
      this.editedRow.approvalStatus = "REJECTED";
      console.log(this.editedRow);
      let approveRequestObj = {'approvalStatus':this.editedRow['approvalStatus'],'remark':this.editedRow.remarks};
      this.leaveService.approveLeaveRequestByHr(approveRequestObj,leaveId).subscribe({
        next:(response)=>{
          console.log(response);
          Swal.fire('Leave Status', response.toString(), 'success');
        },
        error:(error)=>{
          console.log(error);
          Swal.fire('Leave Status', error.error, 'error');
        }
      });
      }
  
      approveCancellationRequest(index:number){
        this.editedRow = {...this.pagedData[index]};
      let leaveId = {...this.pagedData[index]}.leaveId;
      let approvalObj = {'reason':this.editedRow.remarks};
      this.leaveService.cancelApprovedLeaveByRM(leaveId,approvalObj).subscribe({
        next:(response)=>{
          console.log(response);
          Swal.fire('Leave Status', response.toString(), 'success');
        },
        error:(error)=>{
          console.log(error);
          Swal.fire('Leave Status', error?.error.message, 'error');
        }
      });
      }
  
      rejectCancellationRequest(index:number){
        this.editedRow = {...this.pagedData[index]};
      let leaveId = {...this.pagedData[index]}.leaveId;
  
      let approveRequestObj = {'reason':this.editedRow.remarks};
      this.leaveService.cancelRejectedLeaveByRM(leaveId,approveRequestObj).subscribe({
        next:(response)=>{
          console.log(response);
          Swal.fire('Leave Status', response.toString(), 'success');
        },
        error:(error)=>{
          console.log(error);
          Swal.fire('Leave Status', error?.error.message, 'error');
        }
      });
      }
  
}
