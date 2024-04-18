import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangFamilyPortalComponent } from './change-family-portal.component';

describe('ChangFamilyPortalComponent', () => {
  let component: ChangFamilyPortalComponent;
  let fixture: ComponentFixture<ChangFamilyPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangFamilyPortalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangFamilyPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
