import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-tab',
  imports: [RouterOutlet,RouterModule,CommonModule],
  templateUrl: './main-tab.component.html',
  styleUrl: './main-tab.component.css'
})
export class MainTabComponent {
role?:string[];
  LoggedUsername?:string;

  constructor(private route:Router){}

  @Input() toggle!:boolean;


  logout() {
    // const token = this.authService.getToken();
    // console.log(this.authService.decodeToken());

    // this.authService.removeToken();

    // Notify about login status change
    // this.authService.loginStatusChanged.emit(false);

    // Navigate to login page
    // this.route.navigate(['/login']);
  }

  ngOnInit(): void {
      // this.LoggedUsername = this.authService.decodeToken()['sub'];
      // if (this.LoggedUsername) {
      // this.LoggedUsername = this.LoggedUsername.split('@')[0];
      // }
      // this.role = this.authService.decodeToken()['roles'];
      // console.log(this.role);
  }
}
