import { Injectable } from '@angular/core';
import { CommonHttpRequestService } from 'ngx-histaff-alpha';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HuEvaluateEditService {
  employeeConcurrentId!: number
  employeeId!: number
  constructor(
    private commonHttpRequestService: CommonHttpRequestService
  ) {
    
  }
  pointFrom!: number;
  getAllEvaluate(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'getAllEvaluate',
      '/api/SysOrtherList/GetEvaluateType'
    );
  }
  getReprensentative(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'getReprensentative',
      '/api/HuClassification/GetReprensentative'
    );
  }
  getSatffAssessment(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'getSatffAssessment',
      '/api/HuClassification/GetSatffAssessment'
    );
  }
}
