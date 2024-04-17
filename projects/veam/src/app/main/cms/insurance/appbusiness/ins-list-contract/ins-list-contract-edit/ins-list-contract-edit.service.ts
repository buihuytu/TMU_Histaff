import { Injectable } from '@angular/core';
import { CommonHttpRequestService } from 'ngx-histaff-alpha';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InsListContractEditService {
  
  constructor(private commonHttpRequestService: CommonHttpRequestService) {
    
  }

  getListYearPeroid(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getListYearPeroid', '/api/AtSalaryPeriod/GetYear');
  }

  getOtherListType(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getOtherListType', '/api/InsChange/GetOtherListInsType');
  }
}
