import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsRegimesComponent } from './ins-regimes.component';

describe('InsRegimesComponent', () => {
  let component: InsRegimesComponent;
  let fixture: ComponentFixture<InsRegimesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsRegimesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsRegimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
