import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrPrepareEditComponent } from './tr-prepare-edit.component';

describe('TrPrepareEditComponent', () => {
  let component: TrPrepareEditComponent;
  let fixture: ComponentFixture<TrPrepareEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrPrepareEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrPrepareEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
