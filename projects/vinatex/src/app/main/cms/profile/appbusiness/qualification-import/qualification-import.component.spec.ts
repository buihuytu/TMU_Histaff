import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualificationImportComponent } from './qualification-import.component';

describe('QualificationImportComponent', () => {
  let component: QualificationImportComponent;
  let fixture: ComponentFixture<QualificationImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualificationImportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualificationImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
