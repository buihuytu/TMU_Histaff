import { Injectable } from '@angular/core';
import { EnumTranslateKey } from 'alpha-global-constants';
import { ICoreAccordionItem, EnumProfileInfoSector } from 'ngx-histaff-alpha';

@Injectable({
  providedIn: 'root'
})
export class ProfileInfoService {

  sectors: ICoreAccordionItem[] =
  [
    {
      id: EnumProfileInfoSector.BASIC,
      header: EnumTranslateKey.PERSONNEL_PROFILE_CENTER_PROFILE_INFO_BASIC,
      open: true,
      editPath: 'basic-edit',
    },
    {
      id: EnumProfileInfoSector.CV,
      header: EnumTranslateKey.PERSONNEL_PROFILE_CENTER_PROFILE_INFO_CV,
      open: false,
      editPath: 'cv-edit',
    },
    {
      id: EnumProfileInfoSector.ADDITIONAL_INFO,
      header: EnumTranslateKey.PERSONNEL_PROFILE_CENTER_PROFILE_INFO_ADDITIONAL_INFO,
      open: false,
      editPath: 'additional-info-edit',
    },
    {
      id: EnumProfileInfoSector.CONTACT,
      header: EnumTranslateKey.PERSONNEL_PROFILE_CENTER_PROFILE_INFO_CONTACT,
      open: false,
      editPath: 'contact-edit',
    },

  ];

  constructor() { }
}
