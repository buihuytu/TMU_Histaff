import { Component, Input, OnInit } from '@angular/core';
import { IParagraph } from '../paragraph';
import { IArticle } from '../article';
import { AuthService } from 'ngx-histaff-alpha';

@Component({
  selector: 'app-paragraph',
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.scss']
})
export class ParagraphComponent implements OnInit {

  @Input() article!: IArticle;
  @Input() item!: IParagraph;

  authenticated!: boolean;
  containsKeyword!: boolean;
  idAnchor!: string;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.authService.authenticated$.subscribe(x => this.authenticated = x);
  }

  onImageError(args: any) {
  }

}
