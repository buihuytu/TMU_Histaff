import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IHomeMenuItem } from '../menu-items';
import { QUICK_LINK_ITEMS } from './quick-link-items';
import { BaseComponent, MultiLanguageService, LayoutService } from 'ngx-histaff-alpha';

const ROW_COUNT: number = 1;
const COLUMN_COUNT: number = 5;

@Component({
  selector: 'app-quick-links',
  templateUrl: './quick-links.component.html',
  styleUrls: ['./quick-links.component.scss']
})
export class QuickLinksComponent extends BaseComponent {

  pageCount!: number;
  columnCount: number = COLUMN_COUNT;

  pages!: IHomeMenuItem[][][];

  constructor(
    public override mls: MultiLanguageService,
    public layoutService: LayoutService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    super(mls);
    this.setQuickLinkItems();
  }

  onMenuItemClick(item: IHomeMenuItem) {
    this.router.navigate([item.path]);
  }

  setQuickLinkItems(): void {

    const quickLinkPages: IHomeMenuItem[][][] = [];
    let quickLinkPage: IHomeMenuItem[][] = [];
    let quickLinkRow: IHomeMenuItem[] = [];

    for (let i = 0; i < 12; i++) {
      const item = QUICK_LINK_ITEMS[i];
      quickLinkRow.push({ ...item });
      if (quickLinkRow.length === COLUMN_COUNT) {
        quickLinkPage.push([...quickLinkRow]);
        quickLinkRow = [];
        if (quickLinkPage.length === ROW_COUNT) {
          quickLinkPages.push([...quickLinkPage]);
          quickLinkPage = [];
        }
      }
    }

    this.pages = quickLinkPages;

  }

}
