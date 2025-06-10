import { Component, OnInit } from '@angular/core';
import { ILeaveHistory } from '../../interface/ILeaveHistory';
import { LeaveService } from '../../../services/leave-management-services/leave.service';
import Swal from 'sweetalert2';
import { IPendingLeaveRequest } from '../../interface/IPendingLeaveRequest';
import { IApprovalRequest } from '../../interface/IApprovalRequest';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-leave-history-hr',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './leave-history-hr.component.html',
  styleUrl: './leave-history-hr.component.css'
})
export class LeaveHistoryHrComponent implements OnInit{
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
        this.leaveService.getLeaveApprovalHistoryForHr().subscribe({
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
        this.leaveService.approveLeaveRequestByHr(approveRequestObj,leaveId).subscribe({
          next:(response)=>{
            console.log(response);
          },
          error:(error)=>{
            console.log(error);
          }
        });
        }
    
        cancelApprovedLeave(){
          console.log("Reject request raised");
          this.editedRow = {...this.pagedData[this.index]};
        let leaveId = {...this.pagedData[this.index]}.leaveId;
        let approvalObj = {'approvalStatus':'REJECTED','reason':this.cancellationForm.value['remark']};
          this.leaveService.rejectApprovedLeave(leaveId,approvalObj).subscribe({
          next:(response)=>{
            console.log(response);
            Swal.fire({
        title: "Leave Request Status",
        text: "Leave Request Rejected Successfully",
        icon: "success"
      })
            this.getMockLeaves();
          },
          error:(error)=>{
            Swal.fire({
        title: "Leave Request Status",
        text: error?.message,
        icon: "error"
      })
          }
        });
        }
  
       
}
