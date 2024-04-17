import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuComCommendComponent } from './hu-com-commend.component';

describe('HuComCommendComponent', () => {
  let component: HuComCommendComponent;
  let fixture: ComponentFixture<HuComCommendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HuComCommendComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HuComCommendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
