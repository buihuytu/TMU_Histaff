import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveCvComponent } from './approve-cv.component';

describe('ApproveCvComponent', () => {
  let component: ApproveCvComponent;
  let fixture: ComponentFixture<ApproveCvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveCvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
