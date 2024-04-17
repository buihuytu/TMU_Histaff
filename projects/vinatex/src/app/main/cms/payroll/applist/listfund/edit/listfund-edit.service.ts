import { Injectable } from '@angular/core';
import { CommonHttpRequestService } from 'ngx-histaff-alpha';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListfundEditService {
  constructor(
    private commonHttpRequestService: CommonHttpRequestService
  ) {
    
  }

  getCompany(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'getCompany',
      '/api/PaListfund/GetCompanyTypes'
    );
  }
  CreateCodeNew(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('CreateNewCode', '/api/PaListfund/CreateCodeNew');
  }

  //getListCompany():

}
