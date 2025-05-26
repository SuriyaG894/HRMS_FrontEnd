import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideCharts } from 'ng2-charts';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend,ArcElement, DoughnutController } from 'chart.js';

// Register necessary components for a bar chart
Chart.register(BarController, BarElement, CategoryScale,  DoughnutController,
 LinearScale, ArcElement,Title, Tooltip, Legend);

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),provideCharts(),provideHttpClient()]
};
