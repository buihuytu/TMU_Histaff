import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { filter } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import { IHomeMenuItem, HOME_MENU_ITEMS } from './menu-items';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, MultiLanguageService, LayoutService, AuthService, AppService, IAuthData, IFormatedResponse } from 'ngx-histaff-alpha';

const HOME_MENU_ROW_COUNT: number = 3;
const HOME_MENU_COLUMN_COUNT: number = 2;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
    './home.component.scss',
  ]
})
export class HomeComponent extends BaseComponent implements OnInit, AfterViewInit {

  sid!: string;
  avatar!: string;
  fullName!: string;
  employeeID!: number;
  username!: string;
  profile!: any[];

  positionName: string = "Chức danh - Cần fetch từ Api";
  employeeCode: string = "Mã nhân viên - Cần fetch từ Api";
  seniority: string = "Thâm niên - Cần fetch từ Api";
  managerName: string = "Người quản lý - Cần fetch từ Api";
  managerPositionName: string = "Chức danh của người quản lý - Cần fetch từ Api";
  month: number = new Date().getMonth() + 1;
  homeMenuPageCount!: number;

  homeMenuPages!: IHomeMenuItem[][][];

  activePage: number = 0;

  landscapeMode!: boolean;

  PWA_HOME_AVAILABLE_YEAR_OFF_DAYS = EnumTranslateKey.PWA_HOME_AVAILABLE_YEAR_OFF_DAYS;
  PWA_HOME_APPROVE_PENDING_YEAR_OFF_DAYS = EnumTranslateKey.PWA_HOME_APPROVE_PENDING_YEAR_OFF_DAYS;
  PWA_HOME_USED_YEAR_OFF_DAYS = EnumTranslateKey.PWA_HOME_USED_YEAR_OFF_DAYS;
  PWA_HOME_BEING_OUTDATED_SOON_YEAR_OFF_DAYS = EnumTranslateKey.PWA_HOME_BEING_OUTDATED_SOON_YEAR_OFF_DAYS;
  PWA_HOME_THIS_MONTH_BIRHDAYS = EnumTranslateKey.PWA_HOME_THIS_MONTH_BIRHDAYS;
  PWA_HOME_THIS_MONTH_OFF_EMPLOYEES = EnumTranslateKey.PWA_HOME_THIS_MONTH_OFF_EMPLOYEES;
  PWA_HOME_THIS_HISTORY_APPROVE = EnumTranslateKey.PWA_HOME_THIS_HISTORY_APPROVE;
  PWA_HOME_THIS_TIME_TABLE!: string;

  PORTAL_COMING_SOON_BIRTHDAY_LIST = api.PORTAL_COMING_SOON_BIRTHDAY_LIST;
  PORTAL_COMING_SOON_OFF_EMPLOYEE_LIST = api.PORTAL_COMING_SOON_OFF_EMPLOYEE_LIST;
  PORTAL_AT_ENTILEMENT_GET_ENTITLEMENT = api.PORTAL_AT_ENTILEMENT_GET_ENTITLEMENT;
  PORTAL_AT_ENTILEMENT_GET_HISTORY_APPROVE = api.PORTAL_AT_ENTILEMENT_GET_HISTORY_APPROVE;



  @ViewChild('container') container!: ElementRef;
  @ViewChild('homeHeder') homeHeder!: ElementRef;
  @ViewChild('comingSoon') comingSoon!: ElementRef;

  halfColWidth!: number;

  entilementCurHave: number = 0;
  entilementCurPending: number = 0;
  entilementCurUsed: number = 0;
  entilementPrevHave: number = 0;

  constructor(
    public override mls: MultiLanguageService,
    public layoutService: LayoutService,
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private appService: AppService
  ) {
    super(mls);

    this.setHomeMenuItems();
    this.PWA_HOME_THIS_TIME_TABLE = this.mls.trans(EnumTranslateKey.PWA_HOME_THIS_TIME_TABLE, this.lang) + ` ${this.month}`

  }

  setHomeMenuItems(): void {

    const homeMenuPages: IHomeMenuItem[][][] = [];
    let homeMenuPage: IHomeMenuItem[][] = [];
    let homeMenuRow: IHomeMenuItem[] = [];

    for (let i = 0; i < 12; i++) {
      const item = HOME_MENU_ITEMS[i];
      homeMenuRow.push({ ...item });
      if (homeMenuRow.length === HOME_MENU_COLUMN_COUNT) {
        homeMenuPage.push([...homeMenuRow]);
        homeMenuRow = [];
        if (homeMenuPage.length === HOME_MENU_ROW_COUNT) {
          homeMenuPages.push([...homeMenuPage]);
          homeMenuPage = [];
        }
      }
    }

    this.homeMenuPages = homeMenuPages;
    console.log(this.homeMenuPages);


  }

  override ngOnInit(): void {

    this.authService.data$.subscribe((x: IAuthData | null) => this.employeeID = x?.employeeId!),

      this.subscriptions.push(
        this.mls.lang$.subscribe(x => this.lang = x)
      )

    this.subscriptions.push(
      this.layoutService.landscapeMode$.subscribe(x => {
        this.landscapeMode = x;

        this.setHomeMenuItems();

      })
    )
    this.subscriptions.push(
      this.layoutService.availableHeight$.subscribe(x => {
        //this.boardRowHeight = (x - 70*2 - 24*3) / 2;
      })
    )

    this.subscriptions.push(
      this.authService.data$.pipe(filter(data => !!data)).subscribe((authData: IAuthData | null) => {
        this.sid = authData!.refreshToken?.user;
        this.avatar = authData!.avatar;
        this.username = authData!.userName;
        this.fullName = authData!.fullName;
        this.employeeID = authData!.employeeId!;
      })
    )
  }

  ngAfterViewInit(): void {

    console.log("Home ngAfterViewInit")

    setTimeout(() => {

      // Đọc Profile
      this.subscriptions.push(
        this.appService.get(api.HU_EMPLOYEE_PORTAL_PROFILE + `?id=${this.employeeID}`)
          .subscribe(x => {
            if (x.ok && x.status === 200) {
              const body: IFormatedResponse = x.body;
              if (body.statusCode === 200) {
                this.profile = body.innerBody;
                this.authService.profileAvatar = body.innerBody?.avatar
              }
            }
          })
      )

      this.subscriptions.push(
        this.appService.get(api.PORTAL_AT_ENTILEMENT_GET_ENTITLEMENT)
          .subscribe(x => {
            if (x.ok && x.status === 200) {
              const body: IFormatedResponse = x.body;
              if (body.statusCode === 200) {
                if (!!body.innerBody) {
                  if (!!body.innerBody.length) {
                    this.entilementCurHave = body.innerBody[0].curHave || 0;
                    this.entilementCurPending = body.innerBody[0].prevUsed || 0;
                    this.entilementCurUsed = body.innerBody[0].curUsed || 0;
                    this.entilementPrevHave = body.innerBody[0].prevHave || 0;
                  }
                }
              } else {
                this.entilementCurHave = 0;
                this.entilementCurPending = 0;
                this.entilementCurUsed = 0;
                this.entilementPrevHave = 0;
              }
            } else {

            }
          })
      )

      this.halfColWidth = this.comingSoon.nativeElement.getBoundingClientRect().width;

    })
  }

  slideConfig = { "slidesToShow": 1, "slidesToScroll": 1 };

  addSlide() {
    //this.slides.push({img: "http://placehold.it/350x150/777777"})
  }

  removeSlide() {
    //this.slides.length = this.slides.length - 1;
  }

  slickInit(e: any) {
  }

  breakpoint(e: any) {
  }

  afterChange(e: any) {
  }

  beforeChange(e: any) {
    this.activePage = e.nextSlide;
  }

  onMenuItemClick(item: IHomeMenuItem) {
    this.router.navigate([item.path]);
  }

}
