import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteScreensComponent } from './favourite-screens.component';

describe('FavouriteScreensComponent', () => {
  let component: FavouriteScreensComponent;
  let fixture: ComponentFixture<FavouriteScreensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavouriteScreensComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FavouriteScreensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
