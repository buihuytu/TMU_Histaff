import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractappendixComponent } from './contractappendix.component';

describe('ContractappendixComponent', () => {
  let component: ContractappendixComponent;
  let fixture: ComponentFixture<ContractappendixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractappendixComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractappendixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
