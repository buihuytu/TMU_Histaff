import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { CommonHttpRequestService, EnumProfileInfoSector, ICoreAccordionItem } from 'ngx-histaff-alpha';

@Injectable({ providedIn: 'root' })
export class HuCommendEditService {
  constructor(
    private commonHttpRequestService: CommonHttpRequestService
  ) {
    
  }
  sectors: ICoreAccordionItem[] = [
    {
      id: EnumProfileInfoSector.BASIC,
      header: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND,
      open: true,
    },
    {
      id: EnumProfileInfoSector.CV,
      header: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_PAYMENT,
      open: true,
    },
  ];
  commendId!: number;
  getAllCommendObjByKey(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'getAllCommendObjByKey',
      '/api/SysOrtherList/GetOtherListByType?typeCode=DTKT'
    );
  }
  getAllStatusByKey(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'getAllStatusByKey',
      '/api/SysOrtherList/GetStatusCommend'
    );
  }
  getAllSourceByKey(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'getAllSourceByKey',
      '/api/SysOrtherList/GetAllSourceByKey'
    );
  }
  getAllAwardTileByKey(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'getAllAwardTileByKey',
      '/api/SysOrtherList/GetOtherListByType?typeCode=DHKT'
    );
  }
  getALLRewardByKey(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'getALLRewardByKey',
      '/api/SysOrtherList/GetOtherListByType?typeCode=HTKT'
    );
  }
  getAllMonthByYear(year: number): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'getAllMonthByYear',
      `/api/AtSalaryPeriod/GetAllMonthByYear?year=${year}`
    );
  }
  create(request: any): Observable<any> {
    return this.commonHttpRequestService.makePostRequest(
      'create',
      '/api/HuCommend/Create',
      request
    );
  }
  update(request: any): Observable<any> {
    return this.commonHttpRequestService.makePostRequest(
      'update',
      api.HU_COMMEND_UPDATE,
      request
    );
  }
}
