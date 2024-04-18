import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ContractListService } from '../../contract-list/contract-list/contract-list.service';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, MultiLanguageService, LayoutService, AppService, RandomAvatarService, IFormatedResponse } from 'ngx-histaff-alpha';

const ROW_COUNT: number = 1;

export interface IComingSoonItem {
  employeeId: number,
  fullName: string;
  avatar: string;
  comingDate: Date;
  profileId?: number
}

@Component({
  selector: 'app-comming-soon',
  templateUrl: './comming-soon.component.html',
  styleUrl: './comming-soon.component.scss'
})
export class CommingSoonComponent extends BaseComponent implements OnChanges, AfterViewInit {

  @Input() caption!: EnumTranslateKey;
  @Input() apiPath!: api;
  @Input() width!: number;

  pageCount!: number;
  columnCount!: number;
  items: any[] = [];

  pages!: IComingSoonItem[][][];

  defaultAvatar!: string;

  constructor(
    public override mls: MultiLanguageService,
    public layoutService: LayoutService,
    private router: Router,
    private route: ActivatedRoute,
    private appService: AppService,
    private ras: RandomAvatarService,
    private contractListService: ContractListService
  ) {
    super(mls);
    this.defaultAvatar = ras.get();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['width']) {
      if (changes['width'].currentValue) {
        this.columnCount = Math.floor((changes['width'].currentValue - this.layoutService.basicSpacing) / (this.layoutService.comingSoonAvatarSize + this.layoutService.basicSpacing))
        this.setItems();
      }
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {

      this.subscriptions.push(
        this.appService.get(this.apiPath)
          .subscribe(x => {
            const body: IFormatedResponse = x.body;
            if (x.ok && x.status === 200) {
              this.items = body.innerBody
              this.setItems();
            }
          })
      )
    })

  }

  onMenuItemClick(item: IComingSoonItem) {
    console.log(item.profileId);
    
    this.router.navigateByUrl('/contract-list/contract-detail');
    this.contractListService.employeeCvId = item.profileId
    
    //this.router.navigate([item.path]);
  }

  setItems(): void {

    //return

    const pages: IComingSoonItem[][][] = [];
    let page: IComingSoonItem[][] = [];
    let row: IComingSoonItem[] = [];

    const count = this.items.length
    for (let i = 0; i < count; i++) {
      const item: IComingSoonItem = this.items[i];
      if (!item.avatar) item.avatar = this.ras.get();
      row.push({ ...item });
      if (row.length === this.columnCount) {
        page.push([...row]);
        row = [];
        if (page.length === ROW_COUNT) {
          pages.push([...page]);
          page = [];
        }
      }
    }
    // the tail
    if (!!row.length) {
      page.push([...row]);
      pages.push([...page]);
    }

    this.pages = pages;

  }

}
