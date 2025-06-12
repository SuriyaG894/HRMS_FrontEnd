 import { NgModule } from '@angular/core';
 import { RouterModule, Routes } from '@angular/router';
 import { ApplyLeaveComponent } from '../component/leave-management-system/apply-leave/apply-leave.component';
 import { ApplyWfhComponent } from '../component/leave-management-system/apply-wfh/apply-wfh.component';
 import { LeaveLogComponent } from '../component/leave-management-system/leave-log/leave-log.component';
 import { WfhLogComponent } from '../component/leave-management-system/wfh-log/wfh-log.component';
 import { LeaveWfhPolicyComponent } from '../component/leave-management-system/leave-wfh-policy/leave-wfh-policy.component';
 import { LeaveDashboardComponent } from '../component/leave-management-system/leave-dashboard/leave-dashboard.component';
 import { LeaveSummaryChartComponent } from '../component/leave-management-system/leave-summary-chart/leave-summary-chart.component';
import { PendingLeaveRequestRmComponent } from '../component/leave-management-system/pending-leave-request-rm/pending-leave-request-rm.component';
import { LeaveHistoryRmComponent } from '../component/leave-management-system/leave-history-rm/leave-history-rm.component';
import { LeaveHistoryHrComponent } from '../component/leave-management-system/leave-history-hr/leave-history-hr.component';
import { PendingLeaveRequestHrComponent } from '../component/leave-management-system/pending-leave-request-hr/pending-leave-request-hr.component';
import { EmployeeLeaveSummaryComponent } from '../component/leave-management-system/employee-leave-summary/employee-leave-summary.component';
import { LeaveAllocationPanelComponent } from '../component/leave-management-system/leave-allocation-panel/leave-allocation-panel.component';
 const routes: Routes = [
  { path: 'dashboard', component: LeaveDashboardComponent },
  { path: 'applyLeave', component: ApplyLeaveComponent },
  { path: 'applyWfh', component: ApplyWfhComponent },
  { path: 'leaveLog', component: LeaveLogComponent },
  { path: 'wfhLog', component: WfhLogComponent },
  { path: 'policy', component: LeaveWfhPolicyComponent },
  { path: 'summary', component: LeaveSummaryChartComponent },
  {path:'pendingRequestRM',component:PendingLeaveRequestRmComponent},
  {path:'pendingRequestHR',component:PendingLeaveRequestHrComponent},
  {path:'leaveHistoryRM',component:LeaveHistoryRmComponent},
  {path:'leaveHistoryHR',component:LeaveHistoryHrComponent},
  {path:'employeeLeaveSummary',component:EmployeeLeaveSummaryComponent},
  {path:'leaveAllocationPanel',component:LeaveAllocationPanelComponent},
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  
 ];
 @NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
 })
 export class LeaveRoutingModule {}