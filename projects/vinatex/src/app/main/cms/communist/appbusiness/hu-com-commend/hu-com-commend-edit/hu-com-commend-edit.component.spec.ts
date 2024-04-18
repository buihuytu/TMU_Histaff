import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuComCommendEditComponent } from './hu-com-commend-edit.component';

describe('HuComCommendEditComponent', () => {
  let component: HuComCommendEditComponent;
  let fixture: ComponentFixture<HuComCommendEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HuComCommendEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HuComCommendEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
