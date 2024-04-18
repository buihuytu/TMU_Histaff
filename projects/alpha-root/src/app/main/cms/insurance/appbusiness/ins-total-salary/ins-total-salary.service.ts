import { Injectable } from '@angular/core';
import { CommonHttpRequestService } from 'ngx-histaff-alpha';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InsTotalSalaryService {

  infoPeriod!: any;
  constructor(private commonHttpRequestService: CommonHttpRequestService) {
    
  }
  getInfoByPeriod(): Observable<any> {
    return this.commonHttpRequestService.makePostRequest('getInforByPeriod', `/api/InsTotalsalary/GetInforByPeriod`, this.infoPeriod);
  }
  getInfoEndPeriod(): Observable<any> {
    return this.commonHttpRequestService.makePostRequest('getInfoEndPeriod', `/api/InsTotalsalary/GetInforEndPeriod`, this.infoPeriod);
  }
}
