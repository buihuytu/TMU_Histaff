import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuareceInfoComponent } from './insuarece-info.component';

describe('InsuareceInfoComponent', () => {
  let component: InsuareceInfoComponent;
  let fixture: ComponentFixture<InsuareceInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsuareceInfoComponent]
    });
    fixture = TestBed.createComponent(InsuareceInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
