import { Injectable } from '@angular/core';
import { CommonHttpRequestService } from 'ngx-histaff-alpha';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InsRegionEditService {
  constructor(private commonHttpRequestService: CommonHttpRequestService) {
    
  }

  GetSalaryBasicByRegion(regionCode : string) : Observable<any>{
    return this.commonHttpRequestService.makeGetRequest('GetSalaryBasicByRegion', `/api/InsRegion/GetSalaryBasicByRegion?code=${regionCode}`);
  }
  getSysOrtherList(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getSysOrtherList', '/api/InsRegion/GetSysOrtherList');
  }
}

