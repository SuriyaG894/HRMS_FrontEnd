import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveLogComponent } from './leave-log.component';

describe('LeaveLogComponent', () => {
  let component: LeaveLogComponent;
  let fixture: ComponentFixture<LeaveLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaveLogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
