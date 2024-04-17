import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeExplainationEditComponent } from './time-explaination-edit.component';

describe('TimeExplainationEditComponent', () => {
  let component: TimeExplainationEditComponent;
  let fixture: ComponentFixture<TimeExplainationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeExplainationEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeExplainationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
