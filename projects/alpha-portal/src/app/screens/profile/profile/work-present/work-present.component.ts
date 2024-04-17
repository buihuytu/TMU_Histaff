import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EnumTranslateKey } from 'alpha-global-constants';
import { BaseComponent, MultiLanguageService, LayoutService, AuthService, RoutingService, UrlService } from 'ngx-histaff-alpha';
import { EnumRegisterItemCode } from '../../../register-off/register-off/enum-register-off-code';

export interface IWorkPresentItem {
  code: EnumRegisterItemCode;
  svg: string;
  captionCode: string;
  path: string;
  color: string;
  backgroundColor: string;
  outerBackgroundColor: string;
}
export const WORK_PRESENT_ITEMS: IWorkPresentItem[] = [
  {
    code: EnumRegisterItemCode.PROFILE_INFO,
    svg: 'assets/images/home/list.svg',
    captionCode: EnumTranslateKey.PWA_HOME_MENU_ITEM_WORKING_PROCESS, //'Quá trình công tác'
    path: 'profile/work-present/working-process',
    color: '#2C71FF',
    backgroundColor: '#ffffff',
    outerBackgroundColor: '#F6F7FB',
  },
  {
    code: EnumRegisterItemCode.CURRICULUM,
    svg: 'assets/images/home/coin.svg',
    captionCode: EnumTranslateKey.PWA_HOME_MENU_ITEM_WAGE_ALLOWANCE, //'Quá trình lương và phụ cấp'
    path: 'profile/work-present/wage-allowance',
    color: '#2C71FF',
    backgroundColor: '#ffffff',
    outerBackgroundColor: '#F6F7FB',
  },
  {
    code: EnumRegisterItemCode.EDUCATION,
    svg: 'assets/images/home/file.svg',
    captionCode: EnumTranslateKey.PWA_HOME_MENU_ITEM_CONTRACT, //'Quá trình ký hợp đồng - phụ lục hợp đồng'
    path: 'profile/work-present/contract',
    color: '#2C71FF',
    backgroundColor: '#ffffff',
    outerBackgroundColor: '#F6F7FB',
  },
  {
    code: EnumRegisterItemCode.INS_INFO,
    svg: 'assets/images/home/bag.svg',
    captionCode: EnumTranslateKey.PWA_HOME_MENU_ITEM_CONCURRENTLY, //'Quá trình kiêm nhiệm'
    path: 'profile/work-present/concurrently',
    color: '#2C71FF',
    backgroundColor: '#ffffff',
    outerBackgroundColor: '#F6F7FB',
  },
  {
    code: EnumRegisterItemCode.BANK_INFO,
    svg: 'assets/images/home/coins.svg',
    captionCode: EnumTranslateKey.PWA_HOME_MENU_ITEM_ALLOWANCE_MNG, //'Quản lý phụ cấp'
    path: 'profile/work-present/allowance-mng',
    color: '#2C71FF',
    backgroundColor: '#ffffff',
    outerBackgroundColor: '#F6F7FB',
  },
  {
    code: EnumRegisterItemCode.BANK_INFO,
    svg: 'assets/images/home/commend.svg',
    captionCode: EnumTranslateKey.PWA_HOME_MENU_ITEM_COMMEND, //'Quản lý khen thưởng'
    path: 'profile/work-present/commend',
    color: '#2C71FF',
    backgroundColor: '#ffffff',
    outerBackgroundColor: '#F6F7FB',
  },
  {
    code: EnumRegisterItemCode.BANK_INFO,
    svg: 'assets/images/home/discipline.svg',
    captionCode: EnumTranslateKey.PWA_HOME_MENU_ITEM_DISCIPLINE, //'Quản lý kỷ luật'
    path: 'profile/work-present/discipline',
    color: '#2C71FF',
    backgroundColor: '#ffffff',
    outerBackgroundColor: '#F6F7FB',
  },
  {
    code: EnumRegisterItemCode.BANK_INFO,
    svg: 'assets/images/home/tick.svg',
    captionCode: EnumTranslateKey.PWA_HOME_MENU_ITEM_EVALUATE, //'Kết quả đánh giá hàng năm'
    path: 'profile/work-present/evaluate',
    color: '#2C71FF',
    backgroundColor: '#ffffff',
    outerBackgroundColor: '#F6F7FB',
  },
];
@Component({
  selector: 'app-work-present',
  templateUrl: './work-present.component.html',
  styleUrls: ['./work-present.component.scss'],
})
export class WorkPresentComponent extends BaseComponent implements OnInit {
  items: IWorkPresentItem[] = WORK_PRESENT_ITEMS;
  constructor(
    public override mls: MultiLanguageService,
    private layoutService: LayoutService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private routingService: RoutingService,
    private urlService : UrlService
  ) {
    super(mls);
    urlService.currentRouteUrl$.next('/profile')
  }
  override ngOnInit(): void {
    console.log(this.authService.data$.value);
  }

  itemClick(item: any) {
    this.routingService.currentScreenCaption$.next(item.captionCode)
    this.router.navigate([item.path]);
  }
}
