import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractinfoComponent } from './contractinfo.component';

describe('ContractinfoComponent', () => {
  let component: ContractinfoComponent;
  let fixture: ComponentFixture<ContractinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractinfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
