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
      id: EnumProfileInfoSector.CV,
      header: EnumTranslateKey.PERSONNEL_PROFILE_CENTER_PROFILE_INFO_CV,
      open: false,
      editPath: 'candidate-cv-edit',
    },
    {
      id: EnumProfileInfoSector.LEVEL_INFO,
      header: EnumTranslateKey.PROFILE_RECRUITMENT_INFO_LEVEL,
      open: false,
      editPath: 'level-info-edit',
    },
    {
      id: EnumProfileInfoSector.WISH,
      header: EnumTranslateKey.PROFILE_RECRUITMENT_WISH,
      open: false,
      editPath: 'wish-edit',
    },
    {
      id: EnumProfileInfoSector.INFO_OTHER,
      header: EnumTranslateKey.PROFILE_RECRUITMENT_INFO_OTHER,
      open: false,
      editPath: 'info-other-edit',
    },
  ];

  constructor() { }
}
