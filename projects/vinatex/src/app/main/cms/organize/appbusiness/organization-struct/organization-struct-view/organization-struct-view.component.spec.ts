import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationStructViewComponent } from './organization-struct-view.component';

describe('OrganizationStructViewComponent', () => {
  let component: OrganizationStructViewComponent;
  let fixture: ComponentFixture<OrganizationStructViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationStructViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizationStructViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
