import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { ICoreAccordionItem, EnumProfileInfoSector, CommonHttpRequestService } from "ngx-histaff-alpha";

@Injectable({
    providedIn: 'root'
})
export class StaffProfileEditService{
listInstance$ =  new BehaviorSubject<number>(0);

    sectors: ICoreAccordionItem[] =
    [
      {
        id: EnumProfileInfoSector.BASIC,
        header: EnumTranslateKey.STAFF_PROFILE_INFO_BASIC,
        open: true,
        required:true
      },
      {
        id: EnumProfileInfoSector.CV,
        header: EnumTranslateKey.STAFF_PROFILE_INFO_CV,
        open: false,
        required:true
      },
      {
        id: EnumProfileInfoSector.ADDITIONAL_INFO,
        header: EnumTranslateKey.STAFF_PROFILE_ADDITIONAL_INFO,
        open: false,
        // required:true
      },
      {
        id: EnumProfileInfoSector.CHARRACT,
        header: EnumTranslateKey.STAFF_PROFILE_CHARRACT,
        open: false,
      },
      {
        id: EnumProfileInfoSector.POLITICAL_ORGANIZATION,
        header: EnumTranslateKey.PERSONNEL_PROFILE_CENTER_PROFILE_INFO_POLITICAL_ORGANIZATION,
        open: false,
      },
      {
        id: EnumProfileInfoSector.EDUCATION,
        header: EnumTranslateKey.PERSONNEL_PROFILE_CENTER_PROFILE_INFO_EDUCATION,
        open: false,
      },
      // {
      //   id: EnumProfileInfoSector.REFERRER,
      //   header: EnumTranslateKey.PERSONNEL_PROFILE_CENTER_PROFILE_INFO_REFERRER,
      //   open: false,
      // },
      {
        id: EnumProfileInfoSector.CONTACT,
        header: EnumTranslateKey.PERSONNEL_PROFILE_CENTER_PROFILE_INFO_CONTACT,
        open: false,
        required : true
      },
      {
        id: EnumProfileInfoSector.BANK_INFO,
        header: EnumTranslateKey.PERSONNEL_PROFILE_CENTER_PROFILE_INFO_BANK_INFO,
        open: false,
      },
      {
        id: EnumProfileInfoSector.SITUATION,
        header: EnumTranslateKey.PERSONNEL_PROFILE_CENTER_PROFILE_INFO_SITUATION,
        open: false,
      },
    ]

    constructor(
      private commonHttpRequestService: CommonHttpRequestService
    ) { }

    InsertStaffProfile(request: any): Observable<any> {
      return this.commonHttpRequestService.makePostRequest("InsertStaffProfile", api.HU_EMPLOYEE_CREATE_PROFILE_INFO,request)
    }
    
    GetCode(code : string): Observable<any>{
      return this.commonHttpRequestService.makeGetRequest("GetCode", api.HU_EMPLOYEE_GET_CODE + code)
    }

    
}