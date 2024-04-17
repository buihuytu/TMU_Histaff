import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrClassComponent } from './tr-class.component';

describe('TrClassComponent', () => {
  let component: TrClassComponent;
  let fixture: ComponentFixture<TrClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrClassComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
