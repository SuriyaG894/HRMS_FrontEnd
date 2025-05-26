import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartType, ChartConfiguration, ChartTypeRegistry } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts'; // ✅ THIS is required!


@Component({
  selector: 'app-leave-summary-chart',
  imports: [CommonModule,BaseChartDirective],
  templateUrl: './leave-summary-chart.component.html',
  styleUrl: './leave-summary-chart.component.css'
})
export class LeaveSummaryChartComponent {
   chartType: 'doughnut' = 'doughnut';

  chartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
      }
    ]
  };

  chartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    cutout: '70%', // size of the donut hole
    plugins: {
      legend: {
        position: 'top',
        display:false,
      },
      tooltip: {
        enabled: true,
      }
    }
  };
}
