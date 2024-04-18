import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoAttachmentEditComponent } from './demo-attachment-edit.component';

describe('DemoAttachmentEditComponent', () => {
  let component: DemoAttachmentEditComponent;
  let fixture: ComponentFixture<DemoAttachmentEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemoAttachmentEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemoAttachmentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
