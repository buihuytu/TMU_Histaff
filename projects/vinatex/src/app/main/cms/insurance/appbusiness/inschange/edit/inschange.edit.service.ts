import { Injectable } from '@angular/core';
import { EnumTranslateKey } from 'alpha-global-constants';
import { ICoreAccordionItem, EnumProfileInfoSector, CommonHttpRequestService } from 'ngx-histaff-alpha';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InsChangeEditService {
  sectors: ICoreAccordionItem[] = [
    {
      id: EnumProfileInfoSector.BASIC,
      header: EnumTranslateKey.ADD_GENERAL_INF,
      open: true,
      required: true,
    },
    {
      id: EnumProfileInfoSector.ADDITTIONAL_INFO_INS,
      header: EnumTranslateKey.ADD_INSURANCE_INF,
      open: true,
    },
    {
      id: EnumProfileInfoSector.ADDITTIONAL_INF_ARREARS,
      header: EnumTranslateKey.ADD_ARREARS_INF,
      open: true,
    },
    {
      id: EnumProfileInfoSector.ADDITTIONAL_INF_WITHDRAWAL,
      header: EnumTranslateKey.ADD_WITHDRAWAL_INF,
      open: true,
    },
  ];

  id!: number;

  constructor(private commonHttpRequestService: CommonHttpRequestService) {
    
  }

  create(request: any): Observable<any> {
    return this.commonHttpRequestService.makePostRequest('create', '/api/InsChange/Create', request);
  }
  update(request: any): Observable<any> {
    return this.commonHttpRequestService.makePostRequest('update', '/api/InsChange/Update', request);
  }

  getOtherListType(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getOtherListType', '/api/InsChange/GetOtherListInsType');
  }

  getInsTypeChange(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getOtherListType', '/api/InsChange/GetTypeInsChange');
  }

  getInforById(id: number): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getInforById', `/api/InsChange/GetInforById?id=${id}`);
  }

  GetLstInsCheck(x: number): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('GetLstInsCheck', `/api/InsChange/GetLstInsCheck?id=${x}`);
  }

  GetUnit(x: number): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('GetUnit', `/api/InsChange/GetUnit?id=${x}`);
  }
}
