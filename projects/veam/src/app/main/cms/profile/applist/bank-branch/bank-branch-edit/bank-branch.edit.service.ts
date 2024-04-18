import { Injectable } from '@angular/core';
import { CommonHttpRequestService } from 'ngx-histaff-alpha';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BankBranchEditService {

  constructor(
    private commonHttpRequestService: CommonHttpRequestService
  ) {
    
  }

  getListBank(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getListBank', '/api/HuBank/GetList');
  }

  getCode(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getCode', '/api/HuBankBranch/GetNewCode');
  }

}
