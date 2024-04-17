import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subscription, filter, switchMap } from 'rxjs';
import { ArticleService } from '../article.service';

import { IArticle } from '../article';
import { IArticlesRequest } from '../articles-request';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

/*
  This list subscribes to global header keyword
  I need to unsubscribe all subscription on destroy
*/
export class ArticleListComponent implements OnInit, OnDestroy {

  loading!: boolean;
  isAdmin: boolean = false;
  publishingId!: number;
  publishedDate: Date | null = null;

  articlesRequest$ = new BehaviorSubject<IArticlesRequest | null>(null);
  pageCount!: number;

  catId$ = new BehaviorSubject<number>(12);
  tagId$ = new BehaviorSubject<number | null>(null);
  currentPage$ = new BehaviorSubject<number>(1);
  pageSize$ = new BehaviorSubject<number>(10);

  posts!: IArticle[];
  imageSource!: string;

  subscriptions: Subscription[] = [];


  constructor(
    private articleService: ArticleService,
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(this.currentPage$.subscribe(x => this.articlesRequest$.next({
      ...this.articlesRequest$.value!,
      currentPage: x
    })))
    this.subscriptions.push(this.pageSize$.subscribe(x => this.articlesRequest$.next({
      ...this.articlesRequest$.value!,
      pageSize: x
    })))
    this.subscriptions.push(this.catId$.subscribe(catId => {
      this.articlesRequest$.next({
        ...this.articlesRequest$.value!,
        catId: catId!
      })
    }))
    this.subscriptions.push(
      this.articlesRequest$.pipe(
        filter(x => !!x && !!x!.catId),
        switchMap(x => {
          this.loading = true;
          return this.articleService.getList(x!)
        })
      ).subscribe(response => {
        if (response.ok && response.status === 200) {
          this.pageCount = Math.ceil(response.body.total_row / this.pageSize$.value);
          console.log("response", response)
          this.articleService.articles$.next(response.body.list_data);
        } else {
          this.pageCount = 0;
          this.posts = [];
        }
        //this.tags = responses[1].list
        this.loading = false;
      })
    )

    this.subscriptions.push(
      this.articleService.articles$.subscribe(x => {
        this.posts = x
      })
    )

  }

  onImageError(args: any) {
  }

  ngOnDestroy(): void {
    this.subscriptions.map(s => {
      if (s) s.unsubscribe()
    })
  }

}
