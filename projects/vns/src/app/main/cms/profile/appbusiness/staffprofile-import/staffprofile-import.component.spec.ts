import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffprofileImportComponent } from './staffprofile-import.component';

describe('StaffprofileImportComponent', () => {
  let component: StaffprofileImportComponent;
  let fixture: ComponentFixture<StaffprofileImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffprofileImportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffprofileImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
