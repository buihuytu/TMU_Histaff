import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrReimbursementImportComponent } from './tr-reimbursement-import.component';

describe('TrReimbursementImportComponent', () => {
  let component: TrReimbursementImportComponent;
  let fixture: ComponentFixture<TrReimbursementImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrReimbursementImportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrReimbursementImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
