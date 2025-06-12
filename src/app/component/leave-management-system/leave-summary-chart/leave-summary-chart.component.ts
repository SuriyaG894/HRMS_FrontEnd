import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { LeaveService } from '../../../services/leave-management-services/leave.service';
import { IYearlyData } from '../../interface/IYearlyData';

@Component({
  selector: 'app-leave-summary-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './leave-summary-chart.component.html',
  styleUrl: './leave-summary-chart.component.css'
})
export class LeaveSummaryChartComponent implements OnInit {
  chartType: 'doughnut' = 'doughnut';
  datas!: IYearlyData;

  chartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Remaining', 'Used'],
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ['#0A1A86', 'green'],
        hoverBackgroundColor: ['#0A1A86', 'green']
      }
    ]
  };

  chartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    cutout: '70%',
    plugins: {
      legend: {
        position: 'top',
        display: false
      },
      tooltip: {
        enabled: true
      }
    }
  };

  constructor(private leaveService: LeaveService) {}

  ngOnInit(): void {
    this.getYearlyLeaveBalance();
  }

  getYearlyLeaveBalance(): void {
    this.leaveService.getYearlyLeaveBalanceSummary().subscribe({
      next: (response) => {
        this.datas = {
          used: response.totalUsedLeave,
          total: response.totalAvailableLeave
        };

        const remaining = this.datas.total - this.datas.used;

        this.chartData = {
          labels: ['Remaining', 'Used'],
          datasets: [
            {
              data: [remaining, this.datas.used],
              backgroundColor: ['#0A1A86', 'green'],
              hoverBackgroundColor: ['#0A1A86', 'green']
            }
          ]
        };
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
