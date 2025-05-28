import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { MainTabComponent } from "./component/main-tab/main-tab.component";
import { CommonModule } from '@angular/common';
import { LoginComponent } from "./component/login/login.component";
import { AuthService } from './services/authService/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'VistaFlow';
  isLoggedIn:boolean = false;

  constructor(private authService:AuthService){

  }

  ngOnInit(): void {
      this.isLoggedIn = this.authService.isLoggedIn();
  }
}
