import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TanleicaDomService } from 'tanleica';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-article-scripts',
  templateUrl: './article-scripts.component.html',
  styleUrls: ['./article-scripts.component.scss']
})
export class ArticleScriptsComponent implements OnInit, AfterViewInit {

  @ViewChild('container') container!: ElementRef;

  shown!: boolean;
  scripts: any[] = [];

  constructor(
    private tanleicaDomService: TanleicaDomService,
    private articleService: ArticleService,
  ) { }

  ngOnInit(): void {
    this.articleService.showScripts$.subscribe(x => this.shown = x);
    this.articleService.scripts$.subscribe((x: any) => setTimeout(() => this.scripts = x));
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.container.nativeElement.style.setProperty('--z-index', this.tanleicaDomService.getMaxZIndex() + 1)
    });
  }

  hideMe(): void {
    this.articleService.showScripts$.next(false);
  }


}
