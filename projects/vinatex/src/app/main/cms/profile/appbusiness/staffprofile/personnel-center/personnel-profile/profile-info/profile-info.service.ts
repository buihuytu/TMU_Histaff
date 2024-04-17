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
      id: EnumProfileInfoSector.POLITICAL_BACKGROUND,
      header: EnumTranslateKey.PERSONNEL_PROFILE_CENTER_PROFILE_INFO_POLITICAL_BACKGROUND,
      open: false,
      editPath: 'political-background-edit',
    },
    {
      id: EnumProfileInfoSector.POLITICAL_ORGANIZATION,
      header: EnumTranslateKey.PERSONNEL_PROFILE_CENTER_PROFILE_INFO_POLITICAL_ORGANIZATION,
      open: false,
      editPath: 'political-organization-edit',
    },
    {
      id: EnumProfileInfoSector.EDUCATION,
      header: EnumTranslateKey.PERSONNEL_PROFILE_CENTER_PROFILE_INFO_EDUCATION,
      open: false,
      editPath: 'education-edit',
    },
    {
      id: EnumProfileInfoSector.REFERRER,
      header: EnumTranslateKey.PERSONNEL_PROFILE_CENTER_PROFILE_INFO_REFERRER,
      open: false,
      editPath: 'referrer-edit',
    },
    {
      id: EnumProfileInfoSector.CONTACT,
      header: EnumTranslateKey.PERSONNEL_PROFILE_CENTER_PROFILE_INFO_CONTACT,
      open: false,
      editPath: 'contact-edit',
    },
    {
      id: EnumProfileInfoSector.BANK_INFO,
      header: EnumTranslateKey.PERSONNEL_PROFILE_CENTER_PROFILE_INFO_BANK_INFO,
      open: false,
      editPath: 'bank-info-edit',
    },
    {
      id: EnumProfileInfoSector.SITUATION,
      header: EnumTranslateKey.PERSONNEL_PROFILE_CENTER_PROFILE_INFO_SITUATION,
      open: false,
      editPath: 'situation-edit',
    },
  ];

  constructor() { }
}
