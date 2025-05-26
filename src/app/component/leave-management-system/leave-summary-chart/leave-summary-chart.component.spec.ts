import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveSummaryChartComponent } from './leave-summary-chart.component';

describe('LeaveSummaryChartComponent', () => {
  let component: LeaveSummaryChartComponent;
  let fixture: ComponentFixture<LeaveSummaryChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaveSummaryChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveSummaryChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
