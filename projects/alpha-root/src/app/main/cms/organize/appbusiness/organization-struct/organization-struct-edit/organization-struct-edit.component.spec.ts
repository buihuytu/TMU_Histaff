import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationStructEditComponent } from './organization-struct-edit.component';

describe('OrganizationStructEditComponent', () => {
  let component: OrganizationStructEditComponent;
  let fixture: ComponentFixture<OrganizationStructEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationStructEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizationStructEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
