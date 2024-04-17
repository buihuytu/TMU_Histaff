import { Injectable } from '@angular/core';
import { CommonHttpRequestService } from 'ngx-histaff-alpha';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PeriodStandardEditService {
  constructor(
    private commonHttpRequestService: CommonHttpRequestService
  ) {
    
  }

  getObjects(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'getStatusList',
      '/api/SysOrtherList/GetOtherListByType?typeCode=OBJECT_EMPLOYEE'
    );
  }

  getPeriodList(year: Number): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'getPeriodList',
      '/api/AtPeriodStandard/GetPeriod?year=' + year
    );
  }
}
