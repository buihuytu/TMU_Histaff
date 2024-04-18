import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';

import { slideInAnimation } from './animations'


@Component({
  selector: 'app-article-center',
  templateUrl: './article-center.component.html',
  styleUrls: ['./article-center.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [slideInAnimation]
})
export class ArticleCenterComponent implements OnInit {

  constructor(
    private contexts: ChildrenOutletContexts,
  ) { }

  ngOnInit(): void {
  }

  getAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }

}