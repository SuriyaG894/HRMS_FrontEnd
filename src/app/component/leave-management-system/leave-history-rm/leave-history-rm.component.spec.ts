import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveHistoryRmComponent } from './leave-history-rm.component';

describe('LeaveHistoryRmComponent', () => {
  let component: LeaveHistoryRmComponent;
  let fixture: ComponentFixture<LeaveHistoryRmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaveHistoryRmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveHistoryRmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
