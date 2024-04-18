import { Injectable } from '@angular/core';
import { CommonHttpRequestService } from 'ngx-histaff-alpha';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListFundSourceEditService {
  constructor(private commonHttpRequestService: CommonHttpRequestService) {
    
  }

  getCompany(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getCompany', '/api/PaListFundSource/GetCompany');
  }
  CreateNewCode(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('CreateNewCode', '/api/PaListFundSource/CreateNewCode');
  }
}
