import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { MainTabComponent } from "./component/main-tab/main-tab.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent, MainTabComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'VistaFlow';
}
