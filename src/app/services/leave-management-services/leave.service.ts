import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../authService/auth.service';
import { Observable } from 'rxjs';
import { ILeaveHistory } from '../../component/interface/ILeaveHistory';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  baseUri:string = "http://localhost:8765/api";

  constructor(private http:HttpClient,private authService:AuthService) { }

  getLeaveLogForEmployee():Observable<ILeaveHistory[]>{
    let employeeId = this.authService.decodeToken()['empId'];
    return this.http.get<ILeaveHistory[]>(`${this.baseUri}/leave-balance/leaveHistory/${employeeId}`);
  }

  cancelLeaveRequestByEmployee(leaveId:number){
    return this.http.put(`${this.baseUri}/leave/cancel/${leaveId}`,{},{responseType:'text'as'json'});

  }
}
