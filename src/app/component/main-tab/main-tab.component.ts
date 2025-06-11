import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { LeaveTabComponent } from "../leave-management-system/leave-tab/leave-tab.component";
import { LeaveDashboardComponent } from "../leave-management-system/leave-dashboard/leave-dashboard.component";
import { HeaderComponent } from "../header/header.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { TabService } from '../../services/tab.service';

@Component({
  selector: 'app-main-tab',
  imports: [RouterOutlet, RouterModule, CommonModule, HeaderComponent, SidebarComponent, LeaveTabComponent],
  templateUrl: './main-tab.component.html',
  styleUrl: './main-tab.component.css'
})
export class MainTabComponent {
role?:string[];
  LoggedUsername?:string;

 @Input() toggle: boolean = false;
@Input() page: string = '';
tab:any;

isScrollable = true;

  constructor(private router: Router,private tabService:TabService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Set scroll visibility based on route
        const noScrollRoutes = ['/leave/policy', '/leave/summary','/leave/applyLeave','/leave/leaveLog','/leave/leaveHistoryHR','/leave/leaveHistoryRM'];
        console.log(!noScrollRoutes.includes(event.urlAfterRedirects));
        this.isScrollable = !noScrollRoutes.includes(event.urlAfterRedirects);
      }
    });
  }


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
      console.log(this.page);
      console.log(this.toggle);
      this.tabService.tab$.subscribe({
        next:(response)=>{
          this.tab = response;
          if(localStorage.getItem('page') !=null){
            this.tab = localStorage.getItem('page');
          }
        }
      })
  }
}
