import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuPersonnelPlaningEditComponent } from './hu-personnel-planing-edit.component';

describe('HuPersonnelPlaningEditComponent', () => {
  let component: HuPersonnelPlaningEditComponent;
  let fixture: ComponentFixture<HuPersonnelPlaningEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HuPersonnelPlaningEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HuPersonnelPlaningEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
