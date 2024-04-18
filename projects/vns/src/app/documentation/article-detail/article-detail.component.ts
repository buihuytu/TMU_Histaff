import { Component, OnInit, AfterViewInit, Renderer2, Inject, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ArticleService } from '../article.service';

import { IArticle } from '../article';
import { IParagraph } from '../paragraph';

import { BehaviorSubject, filter, zip, Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';

import { IFragment } from '../IFragment';
import { AuthService, IGetByIdRequest } from 'ngx-histaff-alpha';

// Prism variable should be catch in JS environment of this.window
declare let Prism: any;

export interface IParagraphsRequest {
  art_id: number
}


@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit, AfterViewInit, OnDestroy {

  article!: IArticle;
  paragraphs!: IParagraph[];
  scripts$ = new BehaviorSubject<HTMLSelectElement[]>([]);
  req: any;
  randomImage!: string;
  isAdmin!: boolean;
  fragments: IFragment[] = [];

  addedScripts: any[] = [];

  subscriptions: Subscription[] = [];

  @ViewChild('postDetail') postDetail!: ElementRef;
  @ViewChild('paragraphNodes') paragraphNodes!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private articleService: ArticleService,
    private renderer: Renderer2,
    //private scriptService: ScriptService,
    @Inject(DOCUMENT) private document: Document
  ) {
    const id = Number(this.route.snapshot.params['id']);
    const request: IGetByIdRequest = { id };
    const paragraphsRequest: IParagraphsRequest = {
      art_id: id
    }
    this.subscriptions.push(

      zip([
        this.articleService.getArticle(request),
        this.articleService.getParagraphs(paragraphsRequest)
      ]).subscribe(xs => {
        if (xs[0].ok && xs[0].status === 200) {
          this.article = xs[0].body
          this.articleService.article$.next(this.article)
        }
        if (xs[1].ok && xs[1].status === 200) {
          this.articleService.paragraphs$.next(xs[1].body.list_data);
        }
      })

    )
  }

  ngOnInit(): void {

    /*
      Reset script$ cache whenever id of article changes
    */
    this.subscriptions.push(
      this.route.params.subscribe(_ => {
        this.articleService.scripts$.next([])
      })
    )

    this.subscriptions.push(
      this.articleService.fragments$.subscribe(fragments => this.fragments = fragments)
    )

    this.subscriptions.push(
      this.articleService.paragraphs$.subscribe(paragraphs => {
        this.paragraphs = paragraphs;
        setTimeout(() => this.highlightAll());
      })
    )


  }

  ngAfterViewInit(): void {

    this.subscriptions.push(
      this.articleService.scriptedParagraphs$.pipe(
        filter(x => !!x.length),
      ).subscribe(x => {

        /*
          First we need to delete all existing scripts
        */

        this.addedScripts.map((s: HTMLScriptElement) => {
          this.renderer.removeChild(this.document.body, s);
        })

        /* ========================================= */

        const newScripts: any[] = [];

        x.map((y: IParagraph) => {

          /* Hold olny script */
          let sFull = y.paragBody.split('||1').join('<');
          sFull = sFull.split('2||').join('>');

          let arr0 = sFull.split('<script') // some script may include props in opening tag
          arr0.map(a0 => {

            if (a0.indexOf('</script>') >= 0) {
              //get script
              let a = a0.split('</script>')[0];

              // restore the prefix
              let s = '<script' + a;
              // restore the surfix
              s = s + '</script>';

              // remove extra spaces
              s = s.replace("    ", " ");
              s = s.replace("   ", " ");
              s = s.replace("  ", " ");
              // remove space around =
              s = s.split(' =').join('=');
              s = s.split('= ').join('=');
              s = s.split('  =').join('=');
              s = s.split('=  ').join('=');
              s = s.split('   =').join('=');
              s = s.split('=   ').join('=');

              /* Find the 1st script tag. Some of them have properties
              For example: <script id="worker1" type="javascript/worker"> */

              // find the position of closing >
              const closingPosition = s.indexOf('>');
              const openingTag = s.substring(0, closingPosition + 1);
              let propertiesString = openingTag.replace('<script', '');
              propertiesString = propertiesString.replace('>', '');
              const properties = !!propertiesString.length ? propertiesString.split(" ") : [];

              const propList: { name: string, value: string, paragraphId: number }[] = [];

              properties.map(pString => {
                const arr = pString.split('=');
                if (!!pString.length) {
                  propList.push({
                    name: arr[0],
                    value: arr[1],
                    paragraphId: y.id
                  })
                }
              })

              s = s.replace(openingTag, '');
              s = s.replace('</script>', '');

              const script = this.renderer.createElement("script");
              const scriptObj: any = {};


              propList.map(prop => {
                this.renderer.setProperty(
                  script,
                  prop.name,
                  prop.value);
                scriptObj[prop.name] = prop.value
              })

              this.renderer.setProperty(
                script,
                "text",
                s);
              scriptObj['text'] = s;

              // console.log("script", s)
              // It will add a new `<script>` on each call
              setTimeout(() => {
                this.addedScripts.push(script);
                this.renderer.appendChild(this.document.body, script)
              });

              newScripts.push(scriptObj);

            }
          })
        })

        this.articleService.scripts$.next(newScripts);

        setTimeout(() => this.highlightAll());

      })
    )
  }

  onImageError(args: any) {
  }

  toggleShowFragments(): void {
    this.articleService.showFragments$.next(!this.articleService.showFragments$.value);
  }

  toggleShowScripts(): void {
    this.articleService.showScripts$.next(!this.articleService.showScripts$.value);
  }

  highlightAll() {
    Prism.highlightAll();
  }

  ngOnDestroy(): void {
    this.subscriptions.map(x => {
      if (x) x.unsubscribe();
    })
  }

}
