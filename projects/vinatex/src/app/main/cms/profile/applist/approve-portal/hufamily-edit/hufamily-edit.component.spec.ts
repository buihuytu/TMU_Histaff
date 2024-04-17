import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HufamilyEditComponent } from './hufamily-edit.component';

describe('HufamilyEditComponent', () => {
  let component: HufamilyEditComponent;
  let fixture: ComponentFixture<HufamilyEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HufamilyEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HufamilyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
