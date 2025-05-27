import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../header/header.component";
import { MainTabComponent } from "../main-tab/main-tab.component";
import { SidebarService } from '../../services/sidebar.service';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule,RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private sideBarService:SidebarService){}

    page!:string;

    isSelected = true;
  toggleSidebar() {
    console.log("Method called"+!this.isSelected);
    this.isSelected = !this.isSelected;
    this.sideBarService.setToggle(this.isSelected);
    
  }

  setPage(page:string){
    this.page = page;
    console.log(this.page);
  }

}
