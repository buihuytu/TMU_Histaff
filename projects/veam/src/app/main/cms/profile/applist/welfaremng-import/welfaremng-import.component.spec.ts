import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelfaremngImportComponent } from './welfaremng-import.component';

describe('WelfaremngImportComponent', () => {
  let component: WelfaremngImportComponent;
  let fixture: ComponentFixture<WelfaremngImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelfaremngImportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelfaremngImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
