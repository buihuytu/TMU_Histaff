import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishEditComponent } from './wish-edit.component';

describe('WishEditComponent', () => {
  let component: WishEditComponent;
  let fixture: ComponentFixture<WishEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WishEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WishEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
