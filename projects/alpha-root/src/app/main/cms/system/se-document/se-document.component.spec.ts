import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeDocumentComponent } from './se-document.component';

describe('SeDocumentComponent', () => {
  let component: SeDocumentComponent;
  let fixture: ComponentFixture<SeDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeDocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
