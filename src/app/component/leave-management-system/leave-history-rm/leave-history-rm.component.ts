import { Component } from '@angular/core';
import { IPendingLeaveRequest } from '../../interface/IPendingLeaveRequest';
import { IApprovalRequest } from '../../interface/IApprovalRequest';
import { LeaveService } from '../../../services/leave-management-services/leave.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-leave-history-rm',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './leave-history-rm.component.html',
  styleUrl: './leave-history-rm.component.css'
})
export class LeaveHistoryRmComponent {

  selectedRequest!:IPendingLeaveRequest;
  index!:number;
  pagedData: any[] = [];
      historyList:IPendingLeaveRequest[] = [];
      currentPage: number = 1;
      pageSize: number = 3;
      totalPages: number = 1;
      showSaveBtn:boolean = false;
      editingRowIndex!:number;
      editedRow!:IApprovalRequest;
      remark!:string;
      cancellationForm!:FormGroup;
    
      constructor(private leaveService:LeaveService,private fb:FormBuilder){
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
      this.cancellationForm = this.fb.group({
      remark: ['', Validators.required]
    });
    }
  
    toggleBtn(){
      this.showSaveBtn = !this.showSaveBtn;
    }

    openModal(request:any,index:number){
      this.selectedRequest = request;
      this.index = index;
    }

    openEditModal(){

    }
    
      
    
      getMockLeaves() {
      this.leaveService.getLeaveApprovalHistory().subscribe({
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
  
      editRow(rowNum:number){
        this.editingRowIndex = rowNum;
        this.editedRow = {...this.pagedData[rowNum]}
      }
  
      approveRequest(index:number){
      this.editedRow = {...this.pagedData[index]};
      let leaveId = {...this.pagedData[index]}.leaveId;
      this.editedRow.approvalStatus = "APPROVED";
      console.log(this.editedRow);
      let approveRequestObj = {'approvalStatus':this.editedRow['approvalStatus'],'remarks':this.editedRow.remarks};
      this.leaveService.approveLeaveRequest(approveRequestObj,leaveId).subscribe({
        next:(response)=>{
          console.log(response);
        },
        error:(error)=>{
          console.log(error);
        }
      });
      }
  
      rejectApprovedLeave(){
        console.log("Reject request raised");
        this.editedRow = {...this.pagedData[this.index]};
      let leaveId = {...this.pagedData[this.index]}.leaveId;
      let approvalObj = {'approvalStatus':'REJECTED','reason':this.cancellationForm.value['remark']};
        this.leaveService.rejectApprovedLeave(leaveId,approvalObj).subscribe({
        next:(response)=>{
          console.log(response);
          Swal.fire({
      title: "Leave Request Status",
      text: "Rejected Successfully",
      icon: "success"
    })
          this.getMockLeaves();
        },
        error:(error)=>{
          Swal.fire({
      title: "Leave Request Status",
      text: error.error.message,
      icon: "success"
    })
        }
      });
      }

}
