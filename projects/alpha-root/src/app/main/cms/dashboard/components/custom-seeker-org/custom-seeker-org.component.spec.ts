import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSeekerOrgComponent } from './custom-seeker-org.component';

describe('CustomSeekerOrgComponent', () => {
  let component: CustomSeekerOrgComponent;
  let fixture: ComponentFixture<CustomSeekerOrgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomSeekerOrgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomSeekerOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
