import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuWorkingHslPcImportComponent } from './hu-working-hsl-pc-import.component';

describe('HuWorkingHslPcImportComponent', () => {
  let component: HuWorkingHslPcImportComponent;
  let fixture: ComponentFixture<HuWorkingHslPcImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HuWorkingHslPcImportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HuWorkingHslPcImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
