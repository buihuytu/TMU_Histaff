import { Injectable } from '@angular/core';
import { CommonHttpRequestService } from 'ngx-histaff-alpha';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SalaryTypeEditService {

  constructor(
    private commonHttpRequestService: CommonHttpRequestService
  ) { 
    
  }

  getSalaryTypeGroupList(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getSalaryTypeGroupList', '/api/SysOrtherList/GetOtherListByType?typeCode=SALARY_TYPE_GROUP');
  }
  getCode(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getCode', '/api/HuSalaryType/CreateCodeAuto');
  }

}
