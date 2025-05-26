import { Routes } from '@angular/router';
import { ApplyLeaveComponent } from './component/leave-management-system/apply-leave/apply-leave.component';
import { ApplyWfhComponent } from './component/leave-management-system/apply-wfh/apply-wfh.component';
import { LeaveLogComponent } from './component/leave-management-system/leave-log/leave-log.component';
import { WfhLogComponent } from './component/leave-management-system/wfh-log/wfh-log.component';
import { LeaveWfhPolicyComponent } from './component/leave-management-system/leave-wfh-policy/leave-wfh-policy.component';
import { AppComponent } from './app.component';
import { LeaveDashboardComponent } from './component/leave-management-system/leave-dashboard/leave-dashboard.component';
import { LeaveSummaryChartComponent } from './component/leave-management-system/leave-summary-chart/leave-summary-chart.component';

export const routes: Routes = [
    {path:'applyLeave',component:ApplyLeaveComponent},
    {path:'applyWfh',component:ApplyWfhComponent},
    {path:'leaveLog',component:LeaveLogComponent},
    {path:'wfhLog',component:WfhLogComponent},
    {path:'policy',component:LeaveWfhPolicyComponent},
    {path:'leave-dashboard',component:LeaveDashboardComponent},
    {path:'leaveSummaryChart',component:LeaveSummaryChartComponent},
];
