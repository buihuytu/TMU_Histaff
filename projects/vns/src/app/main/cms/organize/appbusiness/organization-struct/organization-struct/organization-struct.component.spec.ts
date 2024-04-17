import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationStructComponent } from './organization-struct.component';

describe('OrganizationStructComponent', () => {
  let component: OrganizationStructComponent;
  let fixture: ComponentFixture<OrganizationStructComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationStructComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizationStructComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
