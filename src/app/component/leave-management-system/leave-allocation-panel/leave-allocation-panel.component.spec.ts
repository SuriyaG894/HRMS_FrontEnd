import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveAllocationPanelComponent } from './leave-allocation-panel.component';

describe('LeaveAllocationPanelComponent', () => {
  let component: LeaveAllocationPanelComponent;
  let fixture: ComponentFixture<LeaveAllocationPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaveAllocationPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveAllocationPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
