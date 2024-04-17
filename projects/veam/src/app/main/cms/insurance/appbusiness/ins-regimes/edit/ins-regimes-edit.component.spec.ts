import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsRegimesEditComponent } from './ins-regimes-edit.component';

describe('InsRegimesEditComponent', () => {
  let component: InsRegimesEditComponent;
  let fixture: ComponentFixture<InsRegimesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsRegimesEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsRegimesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
