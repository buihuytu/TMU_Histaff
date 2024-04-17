import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticalBackgroundComponent } from './political-background.component';

describe('PoliticalBackgroundComponent', () => {
  let component: PoliticalBackgroundComponent;
  let fixture: ComponentFixture<PoliticalBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoliticalBackgroundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoliticalBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
