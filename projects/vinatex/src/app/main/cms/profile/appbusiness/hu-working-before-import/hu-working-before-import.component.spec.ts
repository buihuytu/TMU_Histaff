import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuWorkingBeforeImportComponent } from './hu-working-before-import.component';

describe('HuWorkingBeforeImportComponent', () => {
  let component: HuWorkingBeforeImportComponent;
  let fixture: ComponentFixture<HuWorkingBeforeImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HuWorkingBeforeImportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HuWorkingBeforeImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
