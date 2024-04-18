import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrPrepareComponent } from './tr-prepare.component';

describe('TrPrepareComponent', () => {
  let component: TrPrepareComponent;
  let fixture: ComponentFixture<TrPrepareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrPrepareComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrPrepareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
