import { Injectable } from '@angular/core';
import { CommonHttpRequestService } from 'ngx-histaff-alpha';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class PeriodTaxEditService {
  constructor(
    private commonHttpRequestService: CommonHttpRequestService
  ) {
    
  }

  getPeriod(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'getPeriod',
      '/api/PaPeriodTax/GetPeriod'
    );
  }

  getMonth(year: number): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getMonth', `/api/PaPeriodTax/GetMonth?year=${year}`);
  }
}
