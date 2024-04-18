import { Component, OnInit } from '@angular/core';
import { EnumApproveItemCode } from './enum-approve-code';
import { ActivatedRoute, Router } from '@angular/router';
import { EnumTranslateKey } from 'alpha-global-constants';
import { BaseComponent, MultiLanguageService, LayoutService, AuthService, UrlService } from 'ngx-histaff-alpha';

export interface IApproveItem {
  code: EnumApproveItemCode,
  svg: string;
  captionCode: EnumTranslateKey;
  path: string;
  color: string;
  backgroundColor: string;
  outerBackgroundColor: string;
}

export const APPROVE_ITEMS: IApproveItem[] =
  [
    {
      code : EnumApproveItemCode.LEAVE_APPROVE,
      svg: 'assets/images/home/register-off-off.svg',
      captionCode: EnumTranslateKey.PWA_HOME_MENU_ITEM_LEAVE_APPROVE,
      path: 'approve/leave-approve',
      color: '#2C71FF',
      backgroundColor: '#ffffff',
      outerBackgroundColor: '#F6F7FB'
    },
    {
      code : EnumApproveItemCode.OVERTIME_APPROVE,
      svg: 'assets/images/home/register-overtime.svg',
      captionCode: EnumTranslateKey.PWA_HOME_MENU_ITEM_OVERTIME_APPROVE,
      path: 'approve/overtime-approve',
      color: '#2C71FF',
      backgroundColor: '#ffffff',
      outerBackgroundColor: '#F6F7FB'
    },
    {
      code : EnumApproveItemCode.EXPLAIN_APPROVE,
      svg: 'assets/images/home/explain-work.svg',
      captionCode: EnumTranslateKey.PWA_HOME_MENU_ITEM_EXPLAIN_APPROVE,
      path: 'approve/explain-approve',
      color: '#2C71FF',
      backgroundColor: '#ffffff',
      outerBackgroundColor: '#F6F7FB'
    },
    {
      code : EnumApproveItemCode.APPROVE_HISTORY,
      svg: 'assets/images/home/register-history.svg',
      captionCode: EnumTranslateKey.PWA_HOME_MENU_ITEM_APPROVE_HISTORY,
      path: 'approve/approve-history',
      color: '#2C71FF',
      backgroundColor: '#ffffff',
      outerBackgroundColor: '#F6F7FB'
    },
  ]
@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.scss']
})
export class ApproveComponent extends BaseComponent implements OnInit {
  items : IApproveItem[] = APPROVE_ITEMS;
  landscapeMode!: boolean;
  constructor(
    public override mls: MultiLanguageService,
    public layoutService: LayoutService,
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
