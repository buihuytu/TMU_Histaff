import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelLeftMenuComponent } from './personnel-left-menu.component';

describe('PersonnelLeftMenuComponent', () => {
  let component: PersonnelLeftMenuComponent;
  let fixture: ComponentFixture<PersonnelLeftMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonnelLeftMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonnelLeftMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
