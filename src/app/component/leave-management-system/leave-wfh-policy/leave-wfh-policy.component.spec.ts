import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveWfhPolicyComponent } from './leave-wfh-policy.component';

describe('LeaveWfhPolicyComponent', () => {
  let component: LeaveWfhPolicyComponent;
  let fixture: ComponentFixture<LeaveWfhPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaveWfhPolicyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveWfhPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
