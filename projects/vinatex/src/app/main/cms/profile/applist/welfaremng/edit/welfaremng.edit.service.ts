import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from '../../../../../../services/base-api.service';
import { CommonHttpRequestService } from '../../../../../../services/common-http-request.service';

@Injectable({
  providedIn: 'root'
})
export class WelfareMngEditService {

  constructor(
    private commonHttpRequestService: CommonHttpRequestService
  ) { 
    
  }

  getWelfares(effectDate: any): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getWelfares', `/api/HuWelfare/GetList/?effectDate=${effectDate}&expireDate=06-08-2023`);
  }

}
