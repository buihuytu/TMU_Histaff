import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickNumberComponent } from './quick-number.component';

describe('QuickNumberComponent', () => {
  let component: QuickNumberComponent;
  let fixture: ComponentFixture<QuickNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuickNumberComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuickNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
