import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingLeaveRequestHrComponent } from './pending-leave-request-hr.component';

describe('PendingLeaveRequestHrComponent', () => {
  let component: PendingLeaveRequestHrComponent;
  let fixture: ComponentFixture<PendingLeaveRequestHrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingLeaveRequestHrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingLeaveRequestHrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
