import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderButtonDropdownDemoComponent } from './header-button-dropdown-demo.component';

describe('HeaderButtonDropdownDemoComponent', () => {
  let component: HeaderButtonDropdownDemoComponent;
  let fixture: ComponentFixture<HeaderButtonDropdownDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderButtonDropdownDemoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderButtonDropdownDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
