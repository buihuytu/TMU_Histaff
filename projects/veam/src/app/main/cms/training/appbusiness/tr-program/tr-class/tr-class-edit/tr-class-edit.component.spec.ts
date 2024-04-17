import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrClassEditComponent } from './tr-class-edit.component';

describe('TrClassEditComponent', () => {
  let component: TrClassEditComponent;
  let fixture: ComponentFixture<TrClassEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrClassEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrClassEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
