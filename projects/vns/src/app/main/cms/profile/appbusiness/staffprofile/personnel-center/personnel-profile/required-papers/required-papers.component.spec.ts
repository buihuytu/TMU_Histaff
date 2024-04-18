import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequiredPapersComponent } from './required-papers.component';

describe('RequiredPapersComponent', () => {
  let component: RequiredPapersComponent;
  let fixture: ComponentFixture<RequiredPapersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequiredPapersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequiredPapersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
