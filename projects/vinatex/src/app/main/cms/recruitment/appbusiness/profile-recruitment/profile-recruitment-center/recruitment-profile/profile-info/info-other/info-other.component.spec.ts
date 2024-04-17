import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoOtherComponent } from './info-other.component';

describe('InfoOtherComponent', () => {
  let component: InfoOtherComponent;
  let fixture: ComponentFixture<InfoOtherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoOtherComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoOtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
