import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../authService/auth.service';
import { Observable } from 'rxjs';
import { ILeaveHistory } from '../../component/interface/ILeaveHistory';
import { ILeaveApply } from '../../component/interface/ILeaveApply';
import { ILeaveApplyResponse } from '../../component/interface/ILeaveApplyResponse';
import { IPayLoad } from '../../component/interface/IPayLoad';
import { IPendingLeaveRequest } from '../../component/interface/IPendingLeaveRequest';
import { IApprovalRequest } from '../../component/interface/IApprovalRequest';
import { ICancellationRequest } from '../../component/interface/ICancellationRequest';
import { IEmployeeLeaveSummary } from '../../component/interface/IEmployeeLeaveSummary';
import { IQuarterlyLeaveBalance } from '../../component/interface/IQuarterlyLeaveBalance';
import { IYearlyLeaveBalance } from '../../component/interface/IYearlyLeaveBalance';
import { ILeaveBalanceAll } from '../../component/interface/ILeaveBalanceAll';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  payLoad!:IPayLoad;

  baseUri:string = "http://localhost:8765/api";

  constructor(private http:HttpClient,private authService:AuthService) { }

  getLeaveLogForEmployee():Observable<ILeaveHistory[]>{
    let employeeId = this.authService.decodeToken()['empId'];
    return this.http.get<ILeaveHistory[]>(`${this.baseUri}/leave-balance/leaveHistory/${employeeId}`);
  }

  cancelLeaveRequestByEmployee(leaveId:number){
    return this.http.put(`${this.baseUri}/leave/cancel/${leaveId}`,{},{responseType:'text'as'json'});
  }

  applyLeave(leaveRequest:ILeaveApply):Observable<ILeaveApplyResponse>{
    console.log(leaveRequest);
    
    console.log(leaveRequest.adopted);
      this.payLoad = this.authService.decodeToken();
        let employeeId = this.payLoad['empId'];
        return this.http.post<ILeaveApplyResponse>(`${this.baseUri}/leave-balance/apply/${employeeId}`,leaveRequest);
  }

  getPendingLeaveRequestForRM():Observable<IPendingLeaveRequest[]>{
    this.payLoad = this.authService.decodeToken();
    let employeeId = this.payLoad['empId'];
    return this.http.get<IPendingLeaveRequest[]>(`${this.baseUri}/rm/allPendingRequest/${employeeId}`);
  }

  sendApprovalStatusByRM(approvalRequest:IApprovalRequest,leaveId:number){
    return this.http.patch(`${this.baseUri}/rm/approvalStatus/${leaveId}`,approvalRequest,{withCredentials:true,responseType:'text' as 'json'});
  }

  getPrimaryApproverName(){
    let employeeId = this.authService.decodeToken()['empId'];
    return this.http.get(`${this.baseUri}/leave/primaryApproverName/${employeeId}`,{responseType:'text' as 'json'});
  }

  cancelApprovedLeaveByEmployee(leaveId:number,cancellationRequest:ICancellationRequest){
    return this.http.put(`${this.baseUri}/leave/request-cancellation/${leaveId}`,cancellationRequest,{responseType: 'text' as 'json'});
  }

  approveLeaveRequest(approvalRequest:any,leaveId:number){
    console.log(approvalRequest);
    return this.http.patch(`${this.baseUri}/rm/approvalStatus/${leaveId}`,approvalRequest,{responseType:'text' as 'json'});
  }

  cancelApprovedLeaveByRM(leaveId:number,cancellationRequest:ICancellationRequest){
    return this.http.put(`${this.baseUri}/leave/cancellation/${leaveId}`,cancellationRequest,{responseType:'text' as 'json'});
  }

  cancelRejectedLeaveByRM(leaveId:number,cancellationRequest:any){
    return this.http.put(`${this.baseUri}/leave/cancel/reject/${leaveId}`,cancellationRequest,{responseType:'text' as 'json'});
  }

  getLeaveApprovalHistory():Observable<IPendingLeaveRequest[]>{
    let employeeId = this.authService.decodeToken()['empId'];
    return this.http.get<IPendingLeaveRequest[]>(`${this.baseUri}/rm/rm/leaveHistory/${employeeId}`);
  }

  approveLeaveRequestByHr(approvalRequest:any,leaveId:number){
    return this.http.patch(`${this.baseUri}/hr/approvalStatus/${leaveId}`,approvalRequest,{responseType:'text' as 'json'});
  }

  getPendingLeaveRequestForHr():Observable<IPendingLeaveRequest[]>{
    this.payLoad = this.authService.decodeToken();
    let employeeId = this.payLoad['empId'];
    return this.http.get<IPendingLeaveRequest[]>(`${this.baseUri}/hr/allPendingRequest/${employeeId}`);
  }

  getLeaveApprovalHistoryForHr():Observable<IPendingLeaveRequest[]>{
    let employeeId = this.authService.decodeToken()['empId'];
    return this.http.get<IPendingLeaveRequest[]>(`${this.baseUri}/hr/leaveHistory/${employeeId}`);
  }

  rejectApprovedLeave(leaveId:number,cancellationRequest:any){
    console.log(cancellationRequest);
    return this.http.put(`${this.baseUri}/hr/rejectLeaveRequest/${leaveId}`,cancellationRequest,{responseType:'text' as 'json'});
  }

  getEmployeeLeaveSummary():Observable<IEmployeeLeaveSummary[]>{
    return this.http.get<IEmployeeLeaveSummary[]>(`${this.baseUri}/hr/getEmployeeLeaveSummary`);
  }

  getQuarterlyLeaveBalance():Observable<IQuarterlyLeaveBalance>{
      let employeeId = this.authService.decodeToken()['empId'];
      return this.http.get<IQuarterlyLeaveBalance>("http://localhost:8765/api/leave/quarterlyLeaveBalance/"+employeeId);
    }

    getYearlyLeaveBalanceSummary():Observable<IYearlyLeaveBalance>{
      let employeeId = this.authService.decodeToken()['empId'];
      return this.http.get<IYearlyLeaveBalance>(`${this.baseUri}/leave/leaveBalanceSummary/${employeeId}`);
    }

    getEmployeeLeaveSummaryByEmpID(employeeId:number):Observable<IEmployeeLeaveSummary>{
    return this.http.get<IEmployeeLeaveSummary>(`${this.baseUri}/leave/getEmployeeLeaveSummary/${employeeId}`);
  }

  getAllLeaveBalance():Observable<ILeaveBalanceAll[]>{
        return this.http.get<ILeaveBalanceAll[]>(`${this.baseUri}/hr/allLeaveBalance`);
    }

    updateLeaveBalance(employeeId:number,leaveBalance:ILeaveBalanceAll)
    {
        return this.http.put(`${this.baseUri}/hr/${employeeId}`,leaveBalance,{responseType:'text'as 'json'});
    }


}
