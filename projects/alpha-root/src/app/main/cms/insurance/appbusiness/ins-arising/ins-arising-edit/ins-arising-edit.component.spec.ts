import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsArisingEditComponent } from './ins-arising-edit.component';

describe('InsArisingEditComponent', () => {
  let component: InsArisingEditComponent;
  let fixture: ComponentFixture<InsArisingEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsArisingEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsArisingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
