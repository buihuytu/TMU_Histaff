import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffProfileExtComponent } from './staff-profile-ext.component';

describe('StaffProfileExtComponent', () => {
  let component: StaffProfileExtComponent;
  let fixture: ComponentFixture<StaffProfileExtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffProfileExtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StaffProfileExtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
