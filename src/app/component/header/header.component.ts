import { CommonModule } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit,OnChanges{
ngOnChanges(changes: SimpleChanges): void {
  this.day = this.findDay(new Date().getDay());
    this.year = new Date().getFullYear();
}
hasNotification:boolean=true;
time:number = Date.now();
day?:string;
year?:number;
ngOnInit(): void {
    this.day = this.findDay(new Date().getDay());
    this.year = new Date().getFullYear();
}

findDay(day:number):string{
  switch(day){
    case 1:
      return "Monday";
      break;
    case 2:
      return "Tuesday";
      break;
    case 3:
      return "Wednesday";
      break;
    case 4:
      return "Thursday";
      break;
    case 5:
      return "Friday";
      break;
    case 6:
      return "Saturday";
      break;
    case 7:
      return "Sunday";
      break;
    default:
      return "Invalid Day";
  }
}
}
