import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TabService {
private tabSubject = new BehaviorSubject<string>('home');
  tab$ = this.tabSubject.asObservable();

  setTab(value: string) {
    this.tabSubject.next(value);
  }
  constructor() { }
}
