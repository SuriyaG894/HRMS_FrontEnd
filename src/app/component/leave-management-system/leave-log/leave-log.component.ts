import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { LeaveService } from '../../../services/leave-management-services/leave.service';
import { ILeaveHistory } from '../../interface/ILeaveHistory';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-leave-log',
  imports: [CommonModule,ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './leave-log.component.html',
  styleUrl: './leave-log.component.css'
})
export class LeaveLogComponent {

  primaryApproverName= "Suriya Ganesh";

  cancellationForm!:FormGroup;

  leaveId!:number;

  updateLeaveIdOnCancelRequest(leaveId:number){
    this.leaveId = leaveId;
  }

  filterFlag!:boolean;

  showArray:number[] = [5,10,20,50,100];


pagedData: any[] = [];
  historyList:ILeaveHistory[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
   leaves: any[] = [];
  totalPages: number = 1;
  filterForm!: FormGroup;

  constructor(private leaveService:LeaveService,private fb:FormBuilder,private http:HttpClient){

  }

  getArrayRange(){
    let val = 0;
    console.log(this.filterFlag);
    if(this.filterFlag === false){
    if(this.leaves.length>=5 && this.leaves.length < 10){
      val = 1;
    }
    else if(this.leaves.length >=10 && this.leaves.length< 20){
      val = 2;
    }
    else if(this.leaves.length >= 20 && this.leaves.length < 50){
      val = 3;
    }
    else{
      val = 4;
    }
  }
  else{
    console.log("PagedDate",this.pagedData.length);
    if(this.pagedData.length>=5 && this.pagedData.length < 10){
      val = 1;
    }
    else if(this.pagedData.length >=10 && this.pagedData.length< 20){
      val = 2;
    }
    else if(this.pagedData.length >= 20 && this.pagedData.length < 50){
      val = 3;
    }
    else{
      val = 4;
    }
  }
    return this.showArray.slice(0,val);
  }

  getRange(n: number): number[] {
  return Array.from({ length: n }, (_, i) => i + 1);
}
applyFilters() {
    const { leaveType, status, fromDate, toDate } = this.filterForm.value;
    this.pagedData = this.leaves.filter(l => {
      const matchesLeaveType = leaveType ? l.leaveType.toLowerCase().includes(leaveType.toLowerCase()) : true;
      const matchesStatus = status ? l.status === status : true;
      const appliedDate = new Date(l.appliedOn);
      const matchesFromDate = fromDate ? new Date(fromDate) <= appliedDate : true;
      const matchesToDate = toDate ? new Date(toDate) >= appliedDate : true;
      return matchesLeaveType && matchesStatus && matchesFromDate && matchesToDate;
    });
    this.filterFlag = true;
  }

showSelectedPage(event:Event){
  const selectElement = event.target as HTMLSelectElement;
  // const selectedPage = Number(selectElement.value);
  // this.currentPage = selectedPage;
  // this.updatePagedData();
  // console.log(this.currentPage);
  const selectedRange = Number(selectElement.value);
  this.pageSize = selectedRange;
  this.updatePagedData();
}

  ngOnInit() {
     this.filterForm = this.fb.group({
      leaveType: [''],
      status: [''],
      fromDate: [''],
      toDate: ['']
    });
    this.cancellationForm = this.fb.group({
      reason: ['', Validators.required]
    });
    this.getMockLeaves(); // Only call this
  this.leaveService.getPrimaryApproverName().subscribe({
    next:(response)=>{this.primaryApproverName = response.toString()}
  ,error:(error)=>console.log(error)})

}

  cancelLeave(leaveId:number){
    console.log(leaveId);
    this.leaveService.cancelLeaveRequestByEmployee(leaveId).subscribe({
      next:(response)=>{
        Swal.fire({
  title: "Cancel Request Status",
  text: "Leave Request Cancelled Successfully",
  icon: "success"
})
this.getMockLeaves();
      },
      error:(error)=>{
         Swal.fire({
  title: "Cancel Request Status",
  text: "Leave Request already cancelled/ rejected / approved",
  icon: "error"
})
      }
    });
  }

cancelApprovedLeave(){
  console.log(this.leaveId);
  console.log(this.cancellationForm.value);
  this.leaveService.cancelApprovedLeaveByEmployee(this.leaveId,this.cancellationForm.value).subscribe({
    next:(response)=>{
      console.log(response);
      this.getMockLeaves();
    },
    error:(error)=>{
      console.log(error);
    }
  })
}

  getMockLeaves() {
  this.leaveService.getLeaveLogForEmployee().subscribe({
    next: (response: ILeaveHistory[]) => {
      this.historyList = response;
      this.totalPages = Math.ceil(this.historyList.length / this.pageSize);
      this.leaves = [...this.historyList];
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

  exportDisplayedDataAsCSV() {
  const payload = this.pagedData.map(item => ({
    leaveType: item.leaveType,
    leaveDurationType: item.leaveDurationType,
    dateRange: item.dateRange,
    totalLeaveDays: item.totalLeaveDays,
    noonType: item.noonType,
    appliedOn: item.appliedOn,
    status: item.status,
    approverName: item.approverName,
    remarks: item.remarks || 'N/A'
  }));

  this.http.post('http://localhost:8080/api/leaves/export-direct', payload, { responseType: 'blob' })
    .subscribe((data: Blob) => {
      const blob = new Blob([data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Exported_Filtered_Leave_Data.csv';
      a.click();
      window.URL.revokeObjectURL(url);
    });
}
}
  