import { Routes } from '@angular/router';
import { ApplyLeaveComponent } from './component/leave-management-system/apply-leave/apply-leave.component';
import { ApplyWfhComponent } from './component/leave-management-system/apply-wfh/apply-wfh.component';
import { LeaveLogComponent } from './component/leave-management-system/leave-log/leave-log.component';
import { WfhLogComponent } from './component/leave-management-system/wfh-log/wfh-log.component';
import { LeaveWfhPolicyComponent } from './component/leave-management-system/leave-wfh-policy/leave-wfh-policy.component';
import { AppComponent } from './app.component';
import { LeaveDashboardComponent } from './component/leave-management-system/leave-dashboard/leave-dashboard.component';
import { LeaveSummaryChartComponent } from './component/leave-management-system/leave-summary-chart/leave-summary-chart.component';
import { LeaveTabComponent } from './component/leave-management-system/leave-tab/leave-tab.component';
import { MainTabComponent } from './component/main-tab/main-tab.component';

export const routes: Routes = [

     {
    path: '',
    component: MainTabComponent,
    children: [
      {
        path: 'leave',
        loadChildren: () => import('./modules/leave.module').then(m => m.LeaveModule)
      }
      // ,
      // {
      //   path: 'user',
      //   loadChildren: () => import('./component/user/user.module').then(m => m.UserModule)
      // },
      // {
      //   path: 'project',
      //   loadChildren: () => import('./component/project/project.module').then(m => m.ProjectModule)
      // },
      // {
      //   path: 'timesheet',
      //   loadChildren: () => import('./component/timesheet/timesheet.module').then(m => m.TimesheetMo
      // },
      // {
      //   path: 'notifications',
      //   loadChildren: () => import('./component/notification/notification.module').then(m => m.Notif
      // },
      ,{ path: '', redirectTo: 'leave/dashboard', pathMatch: 'full' }
    ]
  }
];
