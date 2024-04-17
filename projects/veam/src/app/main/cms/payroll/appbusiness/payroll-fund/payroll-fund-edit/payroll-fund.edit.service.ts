import { Injectable } from '@angular/core';
import { CommonHttpRequestService } from 'ngx-histaff-alpha';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PayrollFundEditService {
  constructor(private commonHttpRequestService: CommonHttpRequestService) {
    
  }

  getCompany(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getCompany', '/api/PaPayrollFund/GetCompany');
  }
  getListFund(id: number): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getListFund', `/api/PaPayrollFund/GetListFund?id=${id}`);
  }
  getListFundSource(id: number): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'getListFundSource',
      `/api/PaPayrollFund/GetListFundSource?id=${id}`,
    );
  }
  getMonth(year: number): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getMonth', `/api/PaPayrollFund/GetMonth?year=${year}`);
  }
}
