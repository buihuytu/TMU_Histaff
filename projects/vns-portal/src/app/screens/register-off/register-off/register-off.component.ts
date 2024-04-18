import { Component, OnInit } from '@angular/core';
import { EnumRegisterItemCode } from './enum-register-off-code';
import { ActivatedRoute, Router } from '@angular/router';
import { EnumTranslateKey } from 'alpha-global-constants';
import { BaseComponent, MultiLanguageService, LayoutService, AuthService, UrlService } from 'ngx-histaff-alpha';


export interface IRegisterItem {
  code: EnumRegisterItemCode,
  svg: string;
  captionCode: EnumTranslateKey;
  path: string;
  color: string;
  backgroundColor: string;
  outerBackgroundColor: string;
}

export const REGISTER_ITEMS: IRegisterItem[] =
  [
    {
      code : EnumRegisterItemCode.REGISTER_OFF,
      svg: 'assets/images/home/register-off-off.svg',
      captionCode: EnumTranslateKey.PWA_HOME_MENU_ITEM_REGISTER_OFF_OFF,
      path: 'register-off/register-off-edit',
      color: '#2C71FF',
      backgroundColor: '#ffffff',
      outerBackgroundColor: '#F6F7FB'
    },
    {
      code : EnumRegisterItemCode.REGISTER_OVERTIME,
      svg: 'assets/images/home/register-overtime.svg',
      captionCode: EnumTranslateKey.PWA_HOME_MENU_ITEM_REGISTER_OVERTIME,
      path: 'register-off/register-over-time',
      color: '#2C71FF',
      backgroundColor: '#ffffff',
      outerBackgroundColor: '#F6F7FB'
    },
    {
      code : EnumRegisterItemCode.EXPLAIN_WORK,
      svg: 'assets/images/home/explain-work.svg',
      captionCode: EnumTranslateKey.PWA_HOME_MENU_ITEM_REGISTER_EXPLAIN,
      path: 'register-off/explain-work',
      color: '#2C71FF',
      backgroundColor: '#ffffff',
      outerBackgroundColor: '#F6F7FB'
    },
    {
      code : EnumRegisterItemCode.REGISTER_HISTORY,
      svg: 'assets/images/home/register-history.svg',
      captionCode: EnumTranslateKey.PWA_HOME_MENU_ITEM_REGISTER_HISTORY,
      path: 'register-off/register-history',
      color: '#2C71FF',
      backgroundColor: '#ffffff',
      outerBackgroundColor: '#F6F7FB'
    },
  ]
@Component({
  selector: 'app-register-off',
  templateUrl: './register-off.component.html',
  styleUrls: ['./register-off.component.scss']
})

export class RegisterOffComponent extends BaseComponent implements OnInit {
  items : IRegisterItem[] = REGISTER_ITEMS;
  landscapeMode!: boolean;
  constructor(
    public override mls: MultiLanguageService,
    private layoutService: LayoutService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private urlService: UrlService
  ) {
    super(mls);
    urlService.currentRouteUrl$.next('/home')

  }

  override ngOnInit(): void {
    this.subscriptions.push(
      this.layoutService.landscapeMode$.subscribe(x => {
        this.landscapeMode = x;
      })
    )
  }

  itemClick(item : any){
    this.router.navigate([item.path]);
  }
}
