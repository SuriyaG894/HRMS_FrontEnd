 import { NgModule } from '@angular/core';
 import { CommonModule } from '@angular/common';
 import { LeaveRoutingModule } from './leave-routing.module';
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
 @NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    LeaveRoutingModule,
    ApplyLeaveComponent,
    ApplyWfhComponent,
    LeaveLogComponent,
    WfhLogComponent,
    LeaveWfhPolicyComponent,
    LeaveDashboardComponent,
    LeaveSummaryChartComponent,
    PendingLeaveRequestRmComponent,
    LeaveHistoryRmComponent,
    LeaveHistoryRmComponent,
    LeaveHistoryHrComponent,
    PendingLeaveRequestHrComponent
  ]
 })
 export class LeaveModule {}