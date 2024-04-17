import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { EnumTranslateKey, api } from 'alpha-global-constants';
import { CommonHttpRequestService, IGetByIdRequest } from 'ngx-histaff-alpha';

@Injectable({
  providedIn: 'root'
})
export class ProfileRecruitmentCenterService {

  candidate$ = new BehaviorSubject<any>(null)
  candidateCv$ = new BehaviorSubject<any>(null)
  reloadFlag$  = new BehaviorSubject<boolean>(false)
  leftMenuActiveItemIndex!: number;
  leftMenuActiveItemCode!: EnumTranslateKey;
  tabActiveIndex!: number;
  tabActiveHeader!: EnumTranslateKey;
  accordionActiveSectorIndex!: number;
  accordionActiveSectorCode!: EnumTranslateKey;

  avatar!: string | null;
  pendingAvatar!: string | null;

  constructor(
    private commonHttpRequestService: CommonHttpRequestService
  ) { }

  getCandidateCvById(request: IGetByIdRequest): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest("getById", api.RC_CANDIDATE_CV_READ + "?id=" + request.id)
  }

  getCandidateById(request: IGetByIdRequest): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest("getById", api.RC_CANDIDATE_READ + "?id=" + request.id)
  }

  updateAvatarStaffProfile(request: any): Observable<any> {
    return this.commonHttpRequestService.makePostRequest("updateAvatarStaffProfile", api.RC_CANDIDATE_UPDATE_AVATAR_EMPLOYEE,request)
  }
}
