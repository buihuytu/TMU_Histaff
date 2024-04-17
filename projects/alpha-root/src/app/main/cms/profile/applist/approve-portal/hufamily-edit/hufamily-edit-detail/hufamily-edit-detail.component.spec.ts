import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HufamilyEditDetailComponent } from './hufamily-edit-detail.component';

describe('HufamilyEditDetailComponent', () => {
  let component: HufamilyEditDetailComponent;
  let fixture: ComponentFixture<HufamilyEditDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HufamilyEditDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HufamilyEditDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
