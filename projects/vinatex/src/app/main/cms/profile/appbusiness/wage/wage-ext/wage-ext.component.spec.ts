import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WageExtComponent } from './wage-ext.component';

describe('WageExtComponent', () => {
  let component: WageExtComponent;
  let fixture: ComponentFixture<WageExtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WageExtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WageExtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
