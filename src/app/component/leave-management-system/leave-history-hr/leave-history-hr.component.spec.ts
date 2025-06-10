import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveHistoryHrComponent } from './leave-history-hr.component';

describe('LeaveHistoryHrComponent', () => {
  let component: LeaveHistoryHrComponent;
  let fixture: ComponentFixture<LeaveHistoryHrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaveHistoryHrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveHistoryHrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
