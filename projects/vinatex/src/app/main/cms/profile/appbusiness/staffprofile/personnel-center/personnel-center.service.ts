import { Injectable } from '@angular/core';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { CommonHttpRequestService, IGetByIdRequest } from 'ngx-histaff-alpha';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonnelCenterService {

  employee$ = new BehaviorSubject<any>(null)
  employeeCv$ = new BehaviorSubject<any>(null)
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

  getEmployeeCvById(request: IGetByIdRequest): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest("getById", api.HU_EMPLOYEE_CV_READ + "?id=" + request.id)
  }

  getEmployeeById(request: IGetByIdRequest): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest("getById", api.HU_EMPLOYEE_READ + "?id=" + request.id)
  }

  updateAvatarStaffProfile(request: any): Observable<any> {
    return this.commonHttpRequestService.makePostRequest("updateAvatarStaffProfile", api.HU_EMPLOYEE_UPDATE_AVATAR_EMPLOYEE,request)
  }

}
