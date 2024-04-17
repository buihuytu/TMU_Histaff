import { Injectable } from '@angular/core';
import { CommonHttpRequestService } from 'ngx-histaff-alpha';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisciplineEditService {

  constructor(
    private commonHttpRequestService: CommonHttpRequestService
  ) { 
    
  }

  getStatusList(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getStatusList', '/api/SysOrtherList/GetOtherListByType?typeCode=STATUS');
  }
  getDisObjList(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getDisObjList', '/api/SysOrtherList/GetOtherListByType?typeCode=DISCIPLINE_OBJ');
  }
  getDisTypeList(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getDisTypeList', '/api/SysOrtherList/GetOtherListByType?typeCode=DISCIPLINE_TYPE');
  }
  getDecisionTypeList(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getDecisionTypeList', '/api/SysOrtherList/GetOtherListByType?typeCode=DECISION_TYPE');
  }
  getPeriodList(year: Number): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getPeriodList', '/api/HuDiscipline/GetPeriod?year=' + year)
  }

}
