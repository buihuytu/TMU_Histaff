import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterDistributorComponent } from './router-distributor.component';

describe('RouterDistributorComponent', () => {
  let component: RouterDistributorComponent;
  let fixture: ComponentFixture<RouterDistributorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterDistributorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RouterDistributorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
