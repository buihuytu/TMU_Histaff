import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsInformationImportComponent } from './ins-information-import.component';

describe('InsInformationImportComponent', () => {
  let component: InsInformationImportComponent;
  let fixture: ComponentFixture<InsInformationImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsInformationImportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsInformationImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
