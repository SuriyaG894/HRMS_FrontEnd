import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../header/header.component";
import { MainTabComponent } from "../main-tab/main-tab.component";

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, HeaderComponent, MainTabComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

    isSelected = true;
  toggleSidebar() {
    console.log("Method called"+!this.isSelected);
    this.isSelected = !this.isSelected;
    
  }

}
