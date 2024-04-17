import { Injectable } from '@angular/core';
import { EnumTranslateKey } from 'alpha-global-constants';
import { ICoreAccordionItem, EnumProfileInfoSector, CommonHttpRequestService } from 'ngx-histaff-alpha';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InsInformationEditService {
  sectors: ICoreAccordionItem[] = [
    {
      id: EnumProfileInfoSector.BASIC,
      header: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_BHXH_GENERAL,
      open: true,
      required: true,
    },
    {
      id: EnumProfileInfoSector.CV,
      header: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_BHXH_CAPTION,
      open: true,
      required: true,
    },
    {
      id: EnumProfileInfoSector.CHARRACT,
      header: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_BHYT_CAPTION,
      open: true,
      required: true,
    },
    {
      id: EnumProfileInfoSector.EDUCATION,
      header: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_BHTN_CAPTION,
      open: true,
      required: true,
    },
  ];

  id!: number;

  constructor(private commonHttpRequestService: CommonHttpRequestService) {
    
  }
  getInforById(x: number): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getInforById', `/api/InsInformation/GetInforById?id=${x}`);
  }
  GetLstInsCheck(x: number): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('GetLstInsCheck', `/api/InsInformation/GetLstInsCheck?id=${x}`);
  }
  getBhxhStatus(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getBhxhStatus', '/api/InsInformation/getBhxhStatus');
  }
  getBhYtStatus(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getBhYtStatus', '/api/InsInformation/getBhYtStatus');
  }
  getInsWhereHealth(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getInsWhereHealth', `/api/InsInformation/GetInsWhereHealth`);
  }

  create(request: any): Observable<any> {
    return this.commonHttpRequestService.makePostRequest('create', '/api/InsInformation/Create', request);
  }
  update(request: any): Observable<any> {
    return this.commonHttpRequestService.makePostRequest('update', '/api/InsInformation/Update', request);
  }
}
