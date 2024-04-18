import { Component, OnInit } from '@angular/core';
import { EnumRegisterItemCode } from '../../register-off/register-off/enum-register-off-code';
import { ActivatedRoute, Router } from '@angular/router';
import { EnumTranslateKey } from 'alpha-global-constants';
import { BaseComponent, MultiLanguageService, LayoutService, AuthService, UrlService } from 'ngx-histaff-alpha';

export interface IProFileItem {
  code: EnumRegisterItemCode,
  svg: string;
  captionCode: EnumTranslateKey;
  path: string;
  color: string;
  backgroundColor: string;
  outerBackgroundColor: string;
}

export const PROFILE_ITEMS: IProFileItem[] =
  [
    {
      code : EnumRegisterItemCode.PROFILE_STAFF,
      svg: 'assets/images/home/profile-staff.svg',
      captionCode: EnumTranslateKey.PWA_HOME_MENU_ITEM_PROFILE_STAFF,
      path: 'profile/staff-profile',
      color: '#2C71FF',
      backgroundColor: '#ffffff',
      outerBackgroundColor: '#F6F7FB'
    },
    {
      code : EnumRegisterItemCode.WORK_IN_PAST,
      svg: 'assets/images/home/work-past.svg',
      captionCode: EnumTranslateKey.PWA_HOME_MENU_ITEM_WORK_IN_PAST,
      path: 'profile/work-past',
      color: '#2C71FF',
      backgroundColor: '#ffffff',
      outerBackgroundColor: '#F6F7FB'
    },
    {
      code : EnumRegisterItemCode.WORK_IN_PRESENT,
      svg: 'assets/images/home/work-present.svg',
      captionCode: EnumTranslateKey.PWA_HOME_MENU_ITEM_WORK_IN_PRESENT,
      path: 'profile/work-present',
      color: '#2C71FF',
      backgroundColor: '#ffffff',
      outerBackgroundColor: '#F6F7FB'
    },
    {
      code : EnumRegisterItemCode.FAMILY_INFO,
      svg: 'assets/images/home/family-info.svg',
      captionCode: EnumTranslateKey.PWA_HOME_MENU_ITEM_WORK_FAMILY_INFO,
      path: 'profile/family-info',
      color: '#2C71FF',
      backgroundColor: '#ffffff',
      outerBackgroundColor: '#F6F7FB'
    },
    {
      code : EnumRegisterItemCode.CERTIFICATE,
      svg: 'assets/images/home/certificate.svg',
      captionCode: EnumTranslateKey.PWA_HOME_MENU_ITEM_WORK_CERTIFICATE,
      path: 'profile/certificate',
      color: '#2C71FF',
      backgroundColor: '#ffffff',
      outerBackgroundColor: '#F6F7FB'
    },
  ]
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})


export class ProfileComponent extends BaseComponent implements OnInit{
  items : IProFileItem[] = PROFILE_ITEMS;

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

  itemClick(item : any){
    this.router.navigate([item.path]);
  }
}
