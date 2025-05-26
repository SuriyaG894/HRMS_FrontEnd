import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveTabComponent } from './leave-tab.component';

describe('LeaveTabComponent', () => {
  let component: LeaveTabComponent;
  let fixture: ComponentFixture<LeaveTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaveTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
