import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrProgramResultEditComponent } from './tr-program-result-edit.component';

describe('TrProgramResultEditComponent', () => {
  let component: TrProgramResultEditComponent;
  let fixture: ComponentFixture<TrProgramResultEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrProgramResultEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrProgramResultEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
