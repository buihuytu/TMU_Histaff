import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { IArticlesRequest } from './articles-request';
import { IParagraphsRequest } from './paragraphs-request';

import { IArticle } from './article';
import { IParagraph } from './paragraph';

import { IFragment } from './IFragment';

import { HttpHeaders, HttpClient } from '@angular/common/http';
import { IGetByIdRequest, InterceptorSkipHeader } from 'ngx-histaff-alpha';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Credentials': 'true' 
}).set(InterceptorSkipHeader, '');

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private baseURL = 'https://miukafoto.com/api'
  articles$ = new BehaviorSubject<IArticle[]>([]);
  article$ = new BehaviorSubject<IArticle | null>(null);
  paragraphs$ = new BehaviorSubject<IParagraph[]>([]);
  fragments$ = new BehaviorSubject<IFragment[]>([]);
  scriptedParagraphs$ = new BehaviorSubject<IParagraph[]>([]);
  scripts$ = new BehaviorSubject<any[]>([]);
  showFragments$ = new BehaviorSubject<boolean>(false);
  showScripts$ = new BehaviorSubject<boolean>(false);

  constructor(
    private httpClient: HttpClient,
  ) {
    this.paragraphs$.subscribe(paragraphs => {
      this.collectFragments(paragraphs);
    })

  }

  getParagraphs(paragraphsRequest: IParagraphsRequest): Observable<any> {

    return this.httpClient.post(
      `${this.baseURL}/parag/paragraph-list`,
      paragraphsRequest, { headers, observe: 'response' }
    );

  }

  getArticle(getByIdRequest: IGetByIdRequest): Observable<any> {

    return this.httpClient.post(
      `${this.baseURL}/art/article-one`,
      getByIdRequest, { headers, observe: 'response' }
    );

  }

  getList(request: IArticlesRequest): Observable<any> {
    return this.httpClient.post(
      `${this.baseURL}/art/article-list`, request, { headers, observe: 'response' }
    );
  }

  collectFragments(paragraphs: IParagraph[]): void {
    const newFragments: IFragment[] = [];

    // extract props from the first detected '||1a id='
    let name, text;
    paragraphs.filter(x => !!x.paragBody).map(paragraph => {
      const body = paragraph.paragBody.split('||1').join('<');
      const position1 = body.indexOf('<a id=');
      if (position1 > -1) {
        const position2 = body.indexOf('</a>', position1);
        if (position2 > -1) {
          const stringBetween = body.substring(position1, position2 + 4).split('\n').join(''); // 4 is the length of '</a>'
          // get the name after 'id='
          const position3 = stringBetween.indexOf('id=')
          const position4a = stringBetween.indexOf(`'>`, position3 + 4)
          const position4b = stringBetween.indexOf(`">`, position3 + 4)
          const position4 = position4a > -1 ? position4a : (position4b > -1 ? position4b : -1)
          if (position4 > -1) {
            name = stringBetween.substring(position3 + 4, position4);
            // get the text between '>' and '</a>'
            const position5 = stringBetween.indexOf('</a>');
            text = stringBetween.substring(position4 + 2, position5);
            newFragments.push({
              name, text
            })
          }
        }
      }
    })

    this.fragments$.next(newFragments);

  }

}
