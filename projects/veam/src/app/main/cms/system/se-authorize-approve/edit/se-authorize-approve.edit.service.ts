import { Injectable } from '@angular/core';
import { CommonHttpRequestService } from 'ngx-histaff-alpha';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SeAuthorizeApproveEditService {
  constructor(private commonHttpRequestService: CommonHttpRequestService) {
    
  }

  getProcess(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getProcess', '/api/SeAuthorizeApprove/GetProcess');
  }
  getLevelOrder(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getLevelOrder', `/api/SeAuthorizeApprove/GetLevelOrder`);
  }
}
