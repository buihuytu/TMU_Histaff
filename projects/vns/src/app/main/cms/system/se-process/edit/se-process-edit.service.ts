import { Injectable } from '@angular/core';
import { CommonHttpRequestService } from 'ngx-histaff-alpha';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SeProcessEditService {
  constructor(private commonHttpRequestService: CommonHttpRequestService) {
    
  }
  CreateNewCode(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('CreateNewCode', '/api/SeProcess/CreateNewCode');
  }
  GetProcessType(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('GetProcessType', '/api/SeProcess/GetProcessType');
  }
}
