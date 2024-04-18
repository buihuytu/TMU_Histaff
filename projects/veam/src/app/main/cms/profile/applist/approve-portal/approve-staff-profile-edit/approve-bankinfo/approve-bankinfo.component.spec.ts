import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveBankinfoComponent } from './approve-bankinfo.component';

describe('ApproveBankinfoComponent', () => {
  let component: ApproveBankinfoComponent;
  let fixture: ComponentFixture<ApproveBankinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveBankinfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveBankinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
