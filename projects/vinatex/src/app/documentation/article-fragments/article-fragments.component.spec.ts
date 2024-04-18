import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleFragmentsComponent } from './article-fragments.component';

describe('ArticleFragmentsComponent', () => {
  let component: ArticleFragmentsComponent;
  let fixture: ComponentFixture<ArticleFragmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleFragmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleFragmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
