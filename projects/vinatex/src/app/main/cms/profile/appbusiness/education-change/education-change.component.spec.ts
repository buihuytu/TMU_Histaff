import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationChangeComponent } from './education-change.component';

describe('EducationChangeComponent', () => {
  let component: EducationChangeComponent;
  let fixture: ComponentFixture<EducationChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducationChangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EducationChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
