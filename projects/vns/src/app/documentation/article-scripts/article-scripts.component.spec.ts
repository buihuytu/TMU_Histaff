import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleScriptsComponent } from './article-scripts.component';

describe('ArticleScriptsComponent', () => {
  let component: ArticleScriptsComponent;
  let fixture: ComponentFixture<ArticleScriptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleScriptsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleScriptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
