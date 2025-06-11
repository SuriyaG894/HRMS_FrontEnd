import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeLeaveSummaryComponent } from './employee-leave-summary.component';

describe('EmployeeLeaveSummaryComponent', () => {
  let component: EmployeeLeaveSummaryComponent;
  let fixture: ComponentFixture<EmployeeLeaveSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeLeaveSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeLeaveSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
