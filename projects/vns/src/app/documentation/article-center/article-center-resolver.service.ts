import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ArticleService } from '../article.service';

import { ICategory } from '../category';
import { ICategoriesRequest } from '../categories-request';

@Injectable({
  providedIn: 'root'
})
export class ArticleCenterResolverService implements Resolve<ICategory[]> {

  constructor(private articleService: ArticleService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICategory[]> | Observable<never> {
    const categoriesRequest: ICategoriesRequest = {
      active: true,
      adminOnly: false,
    }

    return this.articleService.getCategories(categoriesRequest).pipe(
      mergeMap(mergeMapResponse => {
        if (mergeMapResponse && mergeMapResponse.ok && mergeMapResponse.status === 200) {
          return of(mergeMapResponse.body.list_data);
        } else { // id not found
          this.router.navigate(['/home']);
          return EMPTY;
        }
      })
    );
  }
}
