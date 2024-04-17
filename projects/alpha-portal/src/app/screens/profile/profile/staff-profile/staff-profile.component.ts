import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EnumTranslateKey } from 'alpha-global-constants';
import { BaseComponent, MultiLanguageService, LayoutService, AuthService, RoutingService, UrlService } from 'ngx-histaff-alpha';
import { EnumRegisterItemCode } from '../../../register-off/register-off/enum-register-off-code';

export interface IStaffProFileItem {
  code: EnumRegisterItemCode,
  svg: string;
  captionCode: EnumTranslateKey;
  path: string;
  color: string;
  backgroundColor: string;
  outerBackgroundColor: string;
}
export const STAFF_PROFILE_ITEMS: IStaffProFileItem[] =
  [
    {
      code : EnumRegisterItemCode.PROFILE_INFO,
      svg: 'assets/images/home/profile-info.svg',
      captionCode: EnumTranslateKey.PWA_HOME_MENU_ITEM_PROFILE_INFO,
      path: 'profile/staff-profile/profile-info',
      color: '#2C71FF',
      backgroundColor: '#ffffff',
      outerBackgroundColor: '#F6F7FB'
    },
    {
      code : EnumRegisterItemCode.CURRICULUM,
      svg: 'assets/images/home/curriculum.svg',
      captionCode: EnumTranslateKey.PWA_HOME_MENU_ITEM_PROFILE_CURRICULUM,
      path: 'profile/staff-profile/curriculum',
      color: '#2C71FF',
      backgroundColor: '#ffffff',
      outerBackgroundColor: '#F6F7FB'
    },
    {
      code : EnumRegisterItemCode.CONTACT_INFO,
      svg: 'assets/images/home/contract.svg',
      captionCode: EnumTranslateKey.PWA_HOME_MENU_ITEM_PROFILE_CONTACT,
      path: 'profile/staff-profile/contact',
      color: '#2C71FF',
      backgroundColor: '#ffffff',
      outerBackgroundColor: '#F6F7FB'
    },
    {
      code : EnumRegisterItemCode.ADDITINATIONAL_INFO,
      svg: 'assets/images/home/addinationalinfo.svg',
      captionCode: EnumTranslateKey.PWA_HOME_MENU_ITEM_PROFILE_ADDINATIONAL_INFO,
      path: 'profile/staff-profile/additional-info',
      color: '#2C71FF',
      backgroundColor: '#ffffff',
      outerBackgroundColor: '#F6F7FB'
    },
    {
      code : EnumRegisterItemCode.EDUCATION,
      svg: 'assets/images/home/education.svg',
      captionCode: EnumTranslateKey.PWA_HOME_MENU_ITEM_PROFILE_EDUCATION,
      path: 'profile/staff-profile/education',
      color: '#2C71FF',
      backgroundColor: '#ffffff',
      outerBackgroundColor: '#F6F7FB'
    },
    {
      code : EnumRegisterItemCode.INS_INFO,
      svg: 'assets/images/home/ins-info.svg',
      captionCode: EnumTranslateKey.PWA_HOME_MENU_ITEM_PROFILE_INS_SUR,
      path: 'profile/staff-profile/ins-info',
      color: '#2C71FF',
      backgroundColor: '#ffffff',
      outerBackgroundColor: '#F6F7FB'
    },
    {
      code : EnumRegisterItemCode.BANK_INFO,
      svg: 'assets/images/home/bank-info.svg',
      captionCode: EnumTranslateKey.PWA_HOME_MENU_ITEM_PROFILE_BANK_INFO,
      path: 'profile/staff-profile/bank-info',
      color: '#2C71FF',
      backgroundColor: '#ffffff',
      outerBackgroundColor: '#F6F7FB'
    },
  ]
@Component({
  selector: 'app-staff-profile',
  templateUrl: './staff-profile.component.html',
  styleUrls: ['./staff-profile.component.scss']
})
export class StaffProfileComponent extends BaseComponent implements OnInit{
  items : IStaffProFileItem[] = STAFF_PROFILE_ITEMS;
  constructor(
    public override mls: MultiLanguageService,
    private layoutService: LayoutService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private routingService: RoutingService,
    private urlService: UrlService
  ) {
    super(mls);
    urlService.currentRouteUrl$.next('/profile')


  }
  override ngOnInit(): void {
    console.log(this.authService.data$.value)
  }

  itemClick(item : any){
    this.router.navigate([item.path]);
  }
  
}
