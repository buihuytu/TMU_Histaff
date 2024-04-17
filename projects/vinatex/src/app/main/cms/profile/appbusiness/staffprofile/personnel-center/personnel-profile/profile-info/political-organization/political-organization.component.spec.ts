import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticalOrganizationComponent } from './political-organization.component';

describe('PoliticalOrganizationComponent', () => {
  let component: PoliticalOrganizationComponent;
  let fixture: ComponentFixture<PoliticalOrganizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoliticalOrganizationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoliticalOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
