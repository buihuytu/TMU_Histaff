import { Injectable } from '@angular/core';
import { CommonHttpRequestService } from 'ngx-histaff-alpha';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassificationEditService {

  constructor(
    private commonHttpRequestService: CommonHttpRequestService
  ) { 
    
  }

  getClassificationTypeList(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getClassificationTypeList', '/api/SysOrtherList/GetOtherListByType?typeCode=CLASSIFICATION_TYPE');
  }
  getClassificationLevelList(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getClassificationLevelList', '/api/SysOrtherList/GetOtherListByType?typeCode=CLASSIFICATION_LEVEL');
  }
  getCode(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getCode', '/api/HuClassification/CreateCodeAuto');
  }

}
