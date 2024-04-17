import { TestBed } from '@angular/core/testing';

import { ArticleCenterResolverService } from './article-center-resolver.service';

describe('ArticleCenterResolverService', () => {
  let service: ArticleCenterResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleCenterResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
