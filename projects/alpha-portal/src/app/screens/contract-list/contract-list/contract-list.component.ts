import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { Router } from '@angular/router';
import { BaseComponent, IQueryListRequest, EnumSortDirection, MultiLanguageService, LayoutService, AppService, RandomAvatarService, UrlService, IFormatedResponse, IPagination } from 'ngx-histaff-alpha';
import { BehaviorSubject, Subject, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import { ContractListService } from './contract-list.service';

export interface IEmployeeCv {
  id: string,
  name: string,
  avatar: string,
  jobName: string,
  path?: string;
  captionCode: EnumTranslateKey;
}
@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.scss']
})

export class ContractListComponent extends BaseComponent implements OnInit, AfterViewInit {
  @Input() searchHeight!: number;
  @Input() itemHeight!: number;

  @ViewChild('xl12') xl12!: ElementRef;
  xl12Width: number = 0;

  scollContainerHeight!: number;
  landscapeMode!: boolean;
  items: IEmployeeCv[] = [];
  defaultAvatar!: string;
  search!: string;
  reduced!: boolean;
  placeholder = EnumTranslateKey.UI_COMMON_PLACE_HOLDER_SEARCH_HERE;
  searchText: string = "";
  searchStream$ = new Subject<string>();

  scrollStream$ = new Subject<any>();
  renderAhread: number = 20;
  scrollTop: number = 0;
  offsetY!: number;
  totalHeight!: number;
  visibleNodeCount!: number;

  loading!: boolean;

  // default
  queryListRequest$ = new BehaviorSubject<IQueryListRequest>({
    lang: 'vi',
    search: [
      {
        field: 'fullName',
        searchFor: ''
      }
    ],
    sort: [
      {
        field: 'fullName',
        sortDirection: EnumSortDirection.ASC
      }
    ],
    pagination: {
      skip: 0,
      take: 20,
    }
  });

  constructor(
    public override mls: MultiLanguageService,
    public layoutService: LayoutService,
    private appService: AppService,
    private router: Router,
    private contractListService: ContractListService,
    private ras: RandomAvatarService,
    private urlService: UrlService
  ) {
    super(mls);
    this.defaultAvatar = ras.get();
    this.itemHeight = window.innerHeight * 0.15;
    this.searchHeight = this.layoutService.formControlHeight * 2;
    urlService.currentRouteUrl$.next('/home')
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.xl12Width = this.xl12.nativeElement.getBoundingClientRect().width;

      this.subscriptions.push(

        this.queryListRequest$.pipe(
          // loại bỏ các cú tua trang theo kiểu "The Fast and the Furious"
          debounceTime(1000),
          distinctUntilChanged((prev, curr) => {
            const condition = JSON.stringify(prev) === JSON.stringify(curr);
            console.log("condition", condition)
            return condition;
          }),
          switchMap(x => {
            console.log("switchMap", x)
            this.loading = true;
            return this.appService.post(api.HU_EMPLOYEE_CV_PORTAL_QUERY_LIST, x)
          })
        ).subscribe(x => {
          if (x.ok && x.status === 200) {
            this.loading = false;
            const body: IFormatedResponse = x.body;
            if (body.statusCode === 200) {
              const newData: IEmployeeCv[] = [];
              if (body.innerBody.list !== null) {
                this.totalHeight = body.innerBody.list.length * this.itemHeight;
                body.innerBody.list.map((x: any) => {
                  newData.push({
                    id: x.id,
                    name: x.fullName,
                    jobName: x.jobName,
                    avatar: x.avatar,
                    captionCode: EnumTranslateKey.PWA_HOME_MENU_ITEM_CONTRACT_DETAIL
                  })
                })
                this.totalHeight = body.innerBody.count * this.itemHeight;

                setTimeout(() => this.items = newData)

              } else {
                this.totalHeight = 0;
              }
            }
          }
        })
      )
    })
  }

  onScrollLoading(e: any): void {
    this.scrollStream$.next(e);
  }

  calculate(): IPagination | undefined {
    if (!!!this.scollContainerHeight || !!!this.visibleNodeCount) return undefined;

    let startNode = Math.floor(this.scrollTop / this.itemHeight) - this.renderAhread;
    startNode = Math.max(0, startNode);
    let visibleNodeCount = Math.ceil(this.scollContainerHeight / this.itemHeight) + 2 * this.renderAhread;
    visibleNodeCount = Math.ceil(Math.min(this.totalHeight / this.visibleNodeCount - startNode, visibleNodeCount));
    this.offsetY = startNode * this.itemHeight;

    console.log("visibleNodeCount", visibleNodeCount)
    console.log("this.renderAhread", this.renderAhread)

    return {
      skip: startNode,
      take: visibleNodeCount
    }
  }

  onSearchChange(event: string) {
    this.searchStream$.next(event);
  }

  override ngOnInit(): void {

    this.subscriptions.push(
      this.scrollStream$.subscribe(event => {

        this.scrollTop = event.srcElement.scrollTop;

        const pagination = this.calculate();
        this.queryListRequest$.next({
          ...this.queryListRequest$.value,
          pagination
        })

        console.log("this.queryListRequest$.value changed: ", this.queryListRequest$.value)

      })
    )

    this.layoutService.landscapeMode$.subscribe(x => {
      this.landscapeMode = x;
      this.scollContainerHeight = window.innerHeight - this.layoutService.cellHeight * 2 - this.searchHeight - 50;
      if (!!this.itemHeight) {
        this.visibleNodeCount = Math.ceil(this.scollContainerHeight / this.itemHeight);
      }
    })

    this.subscriptions.push(
      this.searchStream$.pipe(
        debounceTime(500),
        distinctUntilChanged()
      ).subscribe(text => {
        this.queryListRequest$.next({
          ...this.queryListRequest$.value,
          search: [
            {
              field: 'fullName',
              searchFor: text
            }
          ]
        })
      })
    )
  }

  itemClick(e: any) {
    this.router.navigateByUrl('/contract-list/contract-detail');
    this.contractListService.employeeCvId = e.id
  }

  override ngOnDestroy(): void {
    this.subscriptions.map(x => x?.unsubscribe());
  }

}
