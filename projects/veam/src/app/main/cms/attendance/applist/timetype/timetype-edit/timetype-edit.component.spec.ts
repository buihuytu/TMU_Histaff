import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeTypeEditComponent } from './timetype-edit.component';

describe('TimeTypeEditComponent', () => {
  let component: TimeTypeEditComponent;
  let fixture: ComponentFixture<TimeTypeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeTypeEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
