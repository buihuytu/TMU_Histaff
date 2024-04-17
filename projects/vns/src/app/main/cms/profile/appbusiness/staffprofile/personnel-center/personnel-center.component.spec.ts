import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelCenterComponent } from './personnel-center.component';

describe('PersonnelCenterComponent', () => {
  let component: PersonnelCenterComponent;
  let fixture: ComponentFixture<PersonnelCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonnelCenterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonnelCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
