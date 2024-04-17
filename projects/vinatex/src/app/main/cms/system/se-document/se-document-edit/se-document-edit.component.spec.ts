import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeDocumentEditComponent } from './se-document-edit.component';

describe('SeDocumentEditComponent', () => {
  let component: SeDocumentEditComponent;
  let fixture: ComponentFixture<SeDocumentEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeDocumentEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeDocumentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
