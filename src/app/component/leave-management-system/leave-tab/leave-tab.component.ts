import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/authService/auth.service';

@Component({
  selector: 'app-leave-tab',
  imports: [RouterOutlet,CommonModule,RouterModule],
  templateUrl: './leave-tab.component.html',
  styleUrl: './leave-tab.component.css'
})
export class LeaveTabComponent {
  role: string | null = null;

  LoggedUsername?:string;
  

  constructor(private route:Router,private authService:AuthService){}

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
      this.role = localStorage.getItem('selectedRole')==null?'USER':localStorage.getItem('selectedRole');
      console.log(this.role);
  }
}
