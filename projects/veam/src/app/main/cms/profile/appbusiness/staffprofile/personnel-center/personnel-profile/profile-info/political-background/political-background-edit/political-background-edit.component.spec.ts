import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticalBackgroundEditComponent } from './political-background-edit.component';

describe('PoliticalBackgroundEditComponent', () => {
  let component: PoliticalBackgroundEditComponent;
  let fixture: ComponentFixture<PoliticalBackgroundEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoliticalBackgroundEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoliticalBackgroundEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
