import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleCenterComponent } from './article-center.component';

describe('ArticleCenterComponent', () => {
  let component: ArticleCenterComponent;
  let fixture: ComponentFixture<ArticleCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleCenterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
