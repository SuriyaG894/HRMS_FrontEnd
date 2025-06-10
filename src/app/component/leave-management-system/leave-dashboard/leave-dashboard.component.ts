import { Component, OnInit } from '@angular/core';
import { LeaveSummaryChartComponent } from "../leave-summary-chart/leave-summary-chart.component";
import { CommonModule } from '@angular/common';
import { SidebarService } from '../../../services/sidebar.service';
import { LeaveTabComponent } from "../leave-tab/leave-tab.component";
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-leave-dashboard',
  imports: [LeaveSummaryChartComponent, CommonModule, LeaveTabComponent,RouterOutlet, RouterModule],
  templateUrl: './leave-dashboard.component.html',
  styleUrl: './leave-dashboard.component.css'
})
export class LeaveDashboardComponent implements OnInit{
    toggle:boolean = false;

    constructor(private sideBarService:SidebarService){}

    ngOnInit(){
      this.sideBarService.toggle$.subscribe((toggle)=>{
        this.toggle = toggle;
      })
    }
}
