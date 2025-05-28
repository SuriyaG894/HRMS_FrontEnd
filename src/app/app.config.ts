import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { authInterceptor } from './component/interceptors/auth.interceptor';
import { AuthService } from './services/authService/auth.service';
import { provideCharts } from 'ng2-charts';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend,ArcElement, DoughnutController } from 'chart.js';
import { ReactiveFormsModule } from '@angular/forms';
import * as pdfjsLib from 'pdfjs-dist';

(pdfjsLib as any).GlobalWorkerOptions.workerSrc = '/assets/pdfjs/pdf.worker.min.js';


// Register necessary components for a bar chart
Chart.register(BarController, BarElement, CategoryScale,  DoughnutController,
 LinearScale, ArcElement,Title, Tooltip, Legend);

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),provideCharts(),
    // Import ReactiveFormsModule for forms usage globally
    importProvidersFrom(ReactiveFormsModule),

    // Provide HttpClient with interceptor for adding JWT token to requests
    provideHttpClient(withInterceptors([authInterceptor])),

    // Provide AuthService as singleton
    AuthService,
  ]
};
