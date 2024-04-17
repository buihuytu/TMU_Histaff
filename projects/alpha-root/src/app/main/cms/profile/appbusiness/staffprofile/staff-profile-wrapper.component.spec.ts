import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffProfileWrapperComponent } from './staff-profile-wrapper.component';

describe('StaffProfileWrapperComponent', () => {
  let component: StaffProfileWrapperComponent;
  let fixture: ComponentFixture<StaffProfileWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffProfileWrapperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StaffProfileWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
