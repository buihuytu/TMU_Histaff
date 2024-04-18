import { Injectable } from '@angular/core';
import { api } from 'alpha-global-constants';
import { CommonHttpRequestService } from 'ngx-histaff-alpha';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterOvertimeService {

  constructor(
    private commonHttpRequestService: CommonHttpRequestService
  ) { 
    
  }

  getTotalOtMonth(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getTotalOtMonth', api.PORTAL_REGISTER_OFF_GET_TOTAL_OT_MONTH);
  }

  
}
