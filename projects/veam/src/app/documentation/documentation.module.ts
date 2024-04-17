import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DocumentationRoutingModule } from './documentation-routing.module';

import { ArticleCenterComponent } from './article-center/article-center.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ParagraphComponent } from './paragraph/paragraph.component';
import { ArticleFragmentsComponent } from './article-fragments/article-fragments.component';

import { StringHtmlPipe } from './string-html.pipe';
import { MapImgToServerPipe } from './map-img-to-server.pipe';
import { PostDateTimePipe } from './post-date-time.pipe';
import { CorePaginationComponent } from 'ngx-histaff-alpha';

@NgModule({
  declarations: [
    ArticleCenterComponent,
    ArticleListComponent,
    ArticleDetailComponent,
    ParagraphComponent,
    ArticleFragmentsComponent,
    StringHtmlPipe,
    MapImgToServerPipe,
    PostDateTimePipe,
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule,
    DocumentationRoutingModule,
    CorePaginationComponent
  ]
})
export class DocumentationModule { }
