import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/authService/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  hasNotification: boolean = true;
  time: number = Date.now();
  day?: string;
  year?: number;
  private timerId?: any;
  showDropdown = false;
  fullName!:string;

  constructor(private authService:AuthService,private route:Router){}

toggleDropdown() {
  this.showDropdown = !this.showDropdown;
  console.log(this.showDropdown);
}

logout() {
  // handle logout logic here
  console.log('Logging out...');
  this.authService.removeToken();
  this.route.navigate(['/login']);
}

  ngOnInit(): void {
    this.fullName = this.authService.decodeToken()['fullName'];
    this.updateTime(); // Initial call
    this.timerId = setInterval(() => {
      this.updateTime();
    }, 1000); // Update every 1 second
  }

  ngOnDestroy(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  updateTime(): void {
    const now = new Date();
    this.time = now.getTime();
    this.day = this.findDay(now.getDay());
    this.year = now.getFullYear();
  }

  findDay(day: number): string {
    switch (day) {
      case 0: return "Sun";    // Note: 0 = Sunday in JavaScript
      case 1: return "Mon";
      case 2: return "Tues";
      case 3: return "Wed";
      case 4: return "Thurs";
      case 5: return "Fri";
      case 6: return "Sat";
      default: return "Invalid Day";
    }
  }
}
