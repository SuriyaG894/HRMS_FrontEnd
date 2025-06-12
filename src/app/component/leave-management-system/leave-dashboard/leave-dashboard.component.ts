import { Component, OnInit } from '@angular/core';
import { LeaveSummaryChartComponent } from "../leave-summary-chart/leave-summary-chart.component";
import { CommonModule } from '@angular/common';
import { SidebarService } from '../../../services/sidebar.service';
import { LeaveTabComponent } from "../leave-tab/leave-tab.component";
import { RouterModule, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/authService/auth.service';
import { IQuarterlyLeaveBalance } from '../../interface/IQuarterlyLeaveBalance';
import { Observable } from 'rxjs';
import { LeaveService } from '../../../services/leave-management-services/leave.service';
import { IEmployeeLeaveSummary } from '../../interface/IEmployeeLeaveSummary';
import { IYearlyLeaveBalance } from '../../interface/IYearlyLeaveBalance';

@Component({
  selector: 'app-leave-dashboard',
  imports: [LeaveSummaryChartComponent, CommonModule, LeaveTabComponent,RouterOutlet, RouterModule],
  templateUrl: './leave-dashboard.component.html',
  styleUrl: './leave-dashboard.component.css'
})
export class LeaveDashboardComponent implements OnInit{
    toggle:boolean = false;

    quarterlyLeaveBalance!:IQuarterlyLeaveBalance;

    employeeLeaveSummary!:IEmployeeLeaveSummary;

    yearlyLeaveBalanceSummary!:IYearlyLeaveBalance;

    constructor(private sideBarService:SidebarService,private http:HttpClient,private authServie:AuthService,private leaveService:LeaveService){}

    ngOnInit(){
      this.sideBarService.toggle$.subscribe((toggle)=>{
        this.toggle = toggle;
      })
      this.leaveService.getQuarterlyLeaveBalance().subscribe({
        next:(response)=>{
          this.quarterlyLeaveBalance = response;
        },
        error:(error)=>{
          console.log(error);
        }
      });
      let employeeId = this.authServie.decodeToken()['empId'];
      this.leaveService.getEmployeeLeaveSummaryByEmpID(employeeId).subscribe({
        next:(response)=>{
          console.log(response);
          this.employeeLeaveSummary = response;
        },
        error:(error)=>{
          console.log(error);
        }
      })

      this.leaveService.getYearlyLeaveBalanceSummary().subscribe({
        next:(response)=>{
          this.yearlyLeaveBalanceSummary = response;
        },
        error:(error)=>{
          console.log(error);
        }
      })
    }

    
}
