import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoAttachmentListComponent } from './demo-attachment-list.component';

describe('DemoAttachmentListComponent', () => {
  let component: DemoAttachmentListComponent;
  let fixture: ComponentFixture<DemoAttachmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemoAttachmentListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemoAttachmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
