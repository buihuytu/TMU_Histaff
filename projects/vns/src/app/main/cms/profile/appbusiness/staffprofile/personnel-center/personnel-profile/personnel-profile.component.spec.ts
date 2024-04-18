import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelProfileComponent } from './personnel-profile.component';

describe('PersonnelProfileComponent', () => {
  let component: PersonnelProfileComponent;
  let fixture: ComponentFixture<PersonnelProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonnelProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonnelProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
