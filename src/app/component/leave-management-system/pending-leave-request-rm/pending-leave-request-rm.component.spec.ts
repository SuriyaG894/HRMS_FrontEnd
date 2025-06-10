import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingLeaveRequestRmComponent } from './pending-leave-request-rm.component';

describe('PendingLeaveRequestRmComponent', () => {
  let component: PendingLeaveRequestRmComponent;
  let fixture: ComponentFixture<PendingLeaveRequestRmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingLeaveRequestRmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingLeaveRequestRmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
