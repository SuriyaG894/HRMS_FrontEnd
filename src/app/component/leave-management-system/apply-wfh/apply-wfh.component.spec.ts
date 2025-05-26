import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyWfhComponent } from './apply-wfh.component';

describe('ApplyWfhComponent', () => {
  let component: ApplyWfhComponent;
  let fixture: ComponentFixture<ApplyWfhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplyWfhComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplyWfhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
