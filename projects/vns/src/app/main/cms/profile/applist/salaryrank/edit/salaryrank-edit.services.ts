import { Injectable } from '@angular/core';
import { CommonHttpRequestService } from 'ngx-histaff-alpha';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SalaryRankEditService {
  constructor(
    private commonHttpRequestService: CommonHttpRequestService
  ) {
    
  }

  getScales(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'getScales',
      '/api/HuSalaryRank/GetScales'
    );
  }
  GetRankByScaleId(scaleId : number): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'GetRankByScaleId',
      `/api/HuSalaryRank/GetRankByScaleId?scaleId=${scaleId}`
    );
  }
  GetAll(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'GetAll',
      '/api/HuSalaryRank/GetAll'
    );
  }
}
