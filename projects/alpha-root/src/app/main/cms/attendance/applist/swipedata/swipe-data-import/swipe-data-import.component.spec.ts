import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwipeDataImportComponent } from './swipe-data-import.component';

describe('SwipeDataImportComponent', () => {
  let component: SwipeDataImportComponent;
  let fixture: ComponentFixture<SwipeDataImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwipeDataImportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwipeDataImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
