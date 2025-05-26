import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WfhLogComponent } from './wfh-log.component';

describe('WfhLogComponent', () => {
  let component: WfhLogComponent;
  let fixture: ComponentFixture<WfhLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WfhLogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WfhLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
