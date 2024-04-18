import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankInfoEditComponent } from './bank-info-edit.component';

describe('BankInfoEditComponent', () => {
  let component: BankInfoEditComponent;
  let fixture: ComponentFixture<BankInfoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankInfoEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankInfoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
