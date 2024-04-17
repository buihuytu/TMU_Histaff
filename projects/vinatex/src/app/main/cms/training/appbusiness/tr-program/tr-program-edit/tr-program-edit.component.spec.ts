import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrProgramEditComponent } from './tr-program-edit.component';

describe('TrProgramEditComponent', () => {
  let component: TrProgramEditComponent;
  let fixture: ComponentFixture<TrProgramEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrProgramEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrProgramEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
