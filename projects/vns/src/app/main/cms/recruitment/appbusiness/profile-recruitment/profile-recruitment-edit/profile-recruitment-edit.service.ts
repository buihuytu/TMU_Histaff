import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { ICoreAccordionItem, EnumProfileInfoSector, CommonHttpRequestService } from "ngx-histaff-alpha";

@Injectable({
    providedIn: 'root'
})
export class ProfileRecruitmentEditService{
listInstance$ =  new BehaviorSubject<number>(0);

    sectors: ICoreAccordionItem[] =
    [
      {
        id: EnumProfileInfoSector.BASIC,
        header: EnumTranslateKey.PROFILE_RECRUITMENT_BASIC,
        open: true,
        required:true
      },
      {
        id: EnumProfileInfoSector.CV,
        header: EnumTranslateKey.PROFILE_RECRUITMENT_CV,
        open: false,
        required:true
      },
      {
        id: EnumProfileInfoSector.LEVEL_INFO,
        header: EnumTranslateKey.PROFILE_RECRUITMENT_INFO_LEVEL,
        open: false,
      },
      {
        id: EnumProfileInfoSector.WISH,
        header: EnumTranslateKey.PROFILE_RECRUITMENT_WISH,
        open: false,
      },
      {
        id: EnumProfileInfoSector.INFO_OTHER,
        header: EnumTranslateKey.PROFILE_RECRUITMENT_INFO_OTHER,
        open: false,
      },
    ]

    constructor(
      private commonHttpRequestService: CommonHttpRequestService
    ) { }

    InsertProfileRecruitment(request: any): Observable<any> {
      return this.commonHttpRequestService.makePostRequest("InsertProfileRecruitment", api.RC_CANDIDATE_INSERT_PROFILE_RECRUIMENT,request)
    }
    
    GetCode(code : string): Observable<any>{
      return this.commonHttpRequestService.makeGetRequest("GetCode", api.HU_EMPLOYEE_GET_CODE + code)
    }

    getListPos(url: string): Observable<any>{
      return this.commonHttpRequestService.makeGetRequest('queryList', url);
    }

    
}