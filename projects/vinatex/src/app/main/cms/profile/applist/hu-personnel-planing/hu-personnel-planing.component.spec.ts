import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuPersonnelPlaningComponent } from './hu-personnel-planing.component';

describe('HuPersonnelPlaningComponent', () => {
  let component: HuPersonnelPlaningComponent;
  let fixture: ComponentFixture<HuPersonnelPlaningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HuPersonnelPlaningComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HuPersonnelPlaningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
