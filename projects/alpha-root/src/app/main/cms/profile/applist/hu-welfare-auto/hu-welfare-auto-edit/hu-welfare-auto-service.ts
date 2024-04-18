import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from 'alpha-global-constants';
import { CommonHttpRequestService } from 'ngx-histaff-alpha';

@Injectable({ providedIn: 'root' })
export class HuWelfareAutoService {
  constructor(
    private commonHttpRequestService: CommonHttpRequestService
  ) {
    
  }
  getAllPeriodYear(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'getAllPeriodYear',
      '/api/HuWelfareAuto/GetAllPeriodYear'
    );
  }
  getAllGender(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'getAllGender',
      '/api/SysOrtherList/GetAllGender'
    );
  }
  getAllWelfareByKey(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'getAllWelfareByKey',
      api.HU_WELFARE_GETLIST
    );
  }
}
