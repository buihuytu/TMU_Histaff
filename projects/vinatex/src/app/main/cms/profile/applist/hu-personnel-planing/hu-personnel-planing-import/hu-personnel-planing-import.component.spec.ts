import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuPersonnelPlaningImportComponent } from './hu-personnel-planing-import.component';

describe('HuPersonnelPlaningImportComponent', () => {
  let component: HuPersonnelPlaningImportComponent;
  let fixture: ComponentFixture<HuPersonnelPlaningImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HuPersonnelPlaningImportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HuPersonnelPlaningImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
